/**
 * 挑战应答机制 --前端传输密码给后端时使用(注册阶段)
 * 安全性：使用SHA-512哈希算法对密码进行哈希处理，结合随机生成的盐值，增加密码的复杂度，防止彩虹表攻击。
 * 注册流程：
 * 1. 前端生成一个随机盐值（salt）。
 * 2. 用户输入密码后，前端将密码与盐值结合，使用SHA-512算法进行哈希处理，生成哈希值。x = H(s, P)（哈希盐 + 密码）
 * 3. 计算验证器v = g^x mod N，其中x为哈希值，g和N为预定义的大素数和生成元。
 * 4. 将salt和verifier,I(用户名等可以识别用户的就行)发送给后端进行存储。
 */

// RFC 5054 2048-bit group (hex)
const RFC5054_N_HEX = 'EEAF0AB9ADB38DD69C33F80AFA8FC5E86072618775FF3C0B9EA2314C9C256576D674DF7496EA81D3383B4813D692C6E0E0D5D8E250B98BE48E495C1D6089DAD15DC7D7B46154D6B6CE8EF4AD69B15D4982559B297BCF1885C529F566660E57EC68EDBC3C05726CC02FD4CBF4976EAA9AFD5138FE8376435B9FC61D2FC0EB06E3';
// generator, small integer
const RFC5054_g = 2n;

/**
 * 使用 PBKDF2 安全派生密钥：x = PBKDF2(password, salt, iterations, keylen, hash) 现代密码存储标准（OWASP 推荐）
 * @param salt 盐
 * @param password 密码
 * @param iterations 迭代次数，默认600000次
 * @param keyLength 生成密钥长度，默认64字节
 * @param hash 哈希算法，默认SHA-512
 * @returns Promise<string> 十六进制字符串哈希值
 */
async function computeHashedPassword(
    salt: string,
    password: string,
    iterations: number = 600000, // 迭代次数
    keyLength: number = 64, // 生成密钥长度
    hash: string = 'SHA-512' // 哈希算法
): Promise<string>{
    // 盐十六进制转换成Uint8Array
    const saltBytes = new Uint8Array(salt.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));

    // 密码转换成utf-8
    const encoder = new TextEncoder(); 
    const passwordBytes = encoder.encode(password);

    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        passwordBytes,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const derivedBits = await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltBytes,
            iterations,
            hash: {
                name: hash
            }
        },
        keyMaterial,
        keyLength * 8 // bits
    );

    const hashArray = Array.from(new Uint8Array(derivedBits));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * 生成验证器v = g^x mod N
 * @param xHex 十六进制字符串哈希值
 * @param nHex RFC5054_N_HEX
 * @param gBigInt RFC5054_g
 * @returns 
 */
async function computerVerifier(xHex: string, nHex: string = RFC5054_N_HEX, gBigInt: bigint = RFC5054_g): Promise<string> { 
    const xBigInt = BigInt('0x' + xHex);
    const nBigInt = BigInt('0x' + nHex);
    
    const v = await modPow(gBigInt, xBigInt, nBigInt);
    let vHex = v.toString(16);

    return vHex;
}

/**
 * 生成随机盐函数
 * @param length 盐的长度
 * @returns 十六进制字符串
 */
function generateSalt(length: number = 16) {
    const array = new Uint8Array(length)
    window.crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * 模幂运算函数(快速幂)
 * @param base 原始数
 * @param exponent 指数
 * @param modulus 模数
 * @returns 
 */
function modPow(base: bigint, exponent: bigint, modulus: bigint): Promise<bigint> { 
    if (modulus === 1n) return Promise.resolve(0n);
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) { 
        if (exponent % 2n === 1n) { // 如果 exponent 是奇数
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n; // 除以2
        base = (base * base) % modulus;
    }
    return Promise.resolve(result);
}

/**
 * 返回盐和验证器
 * @param password 用户密码 
 * @returns 盐和验证器
 */
async function returnVerifierAndSalt(password: string): Promise<{ salt: string, verifier: string }> { 
    const salt = generateSalt(16); // 16字节盐

    const xHex = await computeHashedPassword(salt, password);
    const verifier = await computerVerifier(xHex);

    // s和v 发给服务器
    return { salt, verifier };
}

export {
    generateSalt, // 生成盐
    computeHashedPassword, // 计算哈希盐和密码
    computerVerifier, // 计算验证器
    modPow, // 模幂运算
    returnVerifierAndSalt, // 返回盐和验证器
    RFC5054_N_HEX
}