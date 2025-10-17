import { modPow, RFC5054_N_HEX, computeHashedPassword } from './RegisterChallengeResponse';

/**
 * 计算SHA-512哈希
 */
async function sha512(data: Uint8Array): Promise<Uint8Array> { 
    const hashBuffer = await window.crypto.subtle.digest('SHA-512', data.slice());
    return new Uint8Array(hashBuffer);
}

/**
 * 将十六进制转为Uint8Array
 */
function hexToUint8Array(hex: string): Uint8Array { 
    return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

/**
 * 将BigInt转为Uint8Array
 */
function bigIntToUint8Array(num: bigint): Uint8Array { 
    const hex = num.toString(16);
    return hexToUint8Array(hex);
}

/**
 * 生成 SRP 客户端临时密钥对：a（私钥）和 A = g^a mod N（公钥）
 * @param NHex 十六进制字符串形式的大素数 N（默认 RFC 5054 2048-bit）
 * @param g 生成元（默认 2n）
 * @returns { a: string; A: string } a 和 A 均为十六进制字符串（无 0x 前缀）a是私钥 A是公钥
 */
async function generateClientEphemeral(
    NHex: string = RFC5054_N_HEX,
    g: bigint = 2n
): Promise<{ a: string; A: string }> {
    // 生成 32 字节（256 位）的密码学安全随机数 a
    const aBytes = new Uint8Array(32);
    window.crypto.getRandomValues(aBytes);

    // 转为十六进制字符串
    const aHex = Array.from(aBytes, b => b.toString(16).padStart(2, '0')).join('');

    // 转为 BigInt
    const a = BigInt('0x' + aHex);
    const N = BigInt('0x' + NHex);

    // 计算 A = g^a mod N
    const A = await modPow(g, a, N);

    // 转回十六进制
    const AHex = A.toString(16);

    return {
        a: aHex,// 私钥,用于后续计算 S = (B - k·v)^{a + u·x} mod N
        A: AHex // 公钥发送给服务器
    };
}

let cached_k: string | null = null; // 乘数参数(防止伪造服务器攻击和两阶段攻击)

/**
 * 预计算乘数参数 k = H(N || g)
 * @param NHex 
 * @param g 
 * @returns 
 */
async function getSRPParameter_k(NHex: string = RFC5054_N_HEX, g: bigint = 2n): Promise<string> { 
    if (cached_k) return cached_k;

    const N = BigInt('0x' + NHex);
    const gBigInt = g;

    const NBytes = bigIntToUint8Array(N);
    const gBytes = bigIntToUint8Array(gBigInt);

    // 拼接N || gBigInt
    const ng = new Uint8Array(NBytes.length + gBytes.length);
    ng.set(NBytes, 0);
    ng.set(gBytes, NBytes.length);

    const k_hash = await sha512(ng);
    cached_k = BigInt('0x' + Array.from(k_hash).map(b => b.toString(16).padStart(2, '0')).join('')).toString(16);
    return cached_k;
}

/**
 * 计算客户端会话密钥 
 */
async function computeClientSessionKey(
    s: string, //来自服务器的盐
    B: string, //服务器的公钥
    A: string, //客户端公钥
    a: string, //客户端私钥,临时
    password: string, //用户密码
    NHex: string = RFC5054_N_HEX, // 大素数
): Promise<{ S: string; K: string }> { 
    const N = BigInt('0x' + NHex);
    const g = 2n;

    // k=H(N,g)
    const kHex = await getSRPParameter_k(NHex, g);
    const k = BigInt('0x' + kHex);

    // u = H(A,B)
    const ABytes = bigIntToUint8Array(BigInt('0x' + A));
    const BBytes = bigIntToUint8Array(BigInt('0x' + B));
    const AB = new Uint8Array(ABytes.length + BBytes.length);
    AB.set(ABytes);
    AB.set(BBytes, ABytes.length);
    const u_hash = await sha512(AB);
    const u = BigInt('0x' + Array.from(u_hash).map(b => b.toString(16).padStart(2, '0')).join(''));

    // x = H(s,P)
    const xHex = await computeHashedPassword(s, password);
    const x = BigInt('0x' + xHex);

    // v = g^x mod N (用于k*v)
    const v = await modPow(g, x, N);

    // B - k·v mod N
    let B_bn = BigInt('0x' + B);
    const kv = (k * v) % N;
    let B_minus_kv = (B_bn - kv + N) % N;

    if (B_minus_kv === 0n) {
        throw new Error("SRP:不为0")
    }

    // a + u*x
    const a_bn = BigInt('0x' + a);
    const exponent = (a_bn + u * x) % (N - 1n);

    // S= (B- k*v)^(a + u*x) mod N
    const S = await modPow(B_minus_kv, exponent, N);

    // 计算K = H(S)
    const SBytes = bigIntToUint8Array(S);
    const K_hash = await sha512(SBytes);
    const K = Array.from(K_hash).map(b => b.toString(16).padStart(2, '0')).join('');

    return {
        S: S.toString(16),
        K: K
    }
}

/**
 * 计算M1 交给服务器验证
 * @param username (I)可以是任意一个唯一识别值
 * @param s 
 * @param A 
 * @param B 
 * @param K 
 * @param NHex 
 * @returns 
 */
async function computeM1(
    username: string,
    s: string,
    A: string,
    B: string,
    K: string,
    NHex: string = RFC5054_N_HEX,
): Promise<string>{
    const N = BigInt('0x' + NHex);
    const g = 2n;

    // H(N) 和 H(g)
    const H_N = await sha512(bigIntToUint8Array(N));
    const H_g = await sha512(bigIntToUint8Array(g));

    // H(N) XOR H(g)
    const H_N_xor_H_g = new Uint8Array(H_N.length);
    for (let i = 0; i < H_N.length; i++) { 
        H_N_xor_H_g[i] = H_N[i] ^ H_g[i];
    }

    // H(I) 这个是用户需要传入的识别唯一值
    const encoder = new TextEncoder();
    const IBytes = encoder.encode(username);
    const H_I = await sha512(IBytes);

    const sBytes = hexToUint8Array(s);
    const ABytes = hexToUint8Array(A);
    const BBytes = hexToUint8Array(B);
    const KBytes = hexToUint8Array(K);

    // 拼接所有部分
    const totalLength = H_N_xor_H_g.length + H_I.length + sBytes.length + ABytes.length + BBytes.length + KBytes.length;

    const M1_input = new Uint8Array(totalLength);
    let offset = 0;

    M1_input.set(H_N_xor_H_g, offset);
    offset += H_N_xor_H_g.length;
    M1_input.set(H_I, offset);
    offset += H_I.length;
    M1_input.set(sBytes, offset);
    offset += sBytes.length;
    M1_input.set(ABytes, offset);
    offset += ABytes.length;
    M1_input.set(BBytes, offset);
    offset += BBytes.length;
    M1_input.set(KBytes, offset);

    const  M1_hash = await sha512(M1_input);
    return Array.from(M1_hash).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * 验证M2
 * @param A 
 * @param M1 
 * @param K 
 * @param M2 
 * @returns 
 */
async function verifyM2(
    A: string,
    M1: string,
    K: string,
    M2: string
): Promise<boolean> { 
    const ABytes = hexToUint8Array(A);
    const M1Bytes = hexToUint8Array(M1);
    const KBytes = hexToUint8Array(K);

    const M2_input = new Uint8Array(ABytes.length + M1Bytes.length + KBytes.length);
    let offset = 0;
    M2_input.set(ABytes, offset);
    offset += ABytes.length;
    M2_input.set(M1Bytes, offset);
    offset += M1Bytes.length;
    M2_input.set(KBytes, offset);

    const M2_hash = await sha512(M2_input);
    const computed_M2 = Array.from(M2_hash).map(b => b.toString(16).padStart(2, '0')).join('');

    return constantTimeEquals(computed_M2, M2);
}

/**
 * 恒定时间字符串比较(防止时序攻击)
 * @param a 
 * @param b 
 * @returns 
 */
function constantTimeEquals(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
}

export {
    generateClientEphemeral,
    computeClientSessionKey,
    computeM1,
    verifyM2
}