import styles from './styles/PasswordInput.module.scss';
import { useEffect, useState, useRef } from 'react';

interface PasswordInputProps {
    length?: number;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
    isOpenSafeKeyword?: boolean;
    width: number;
    userAgent: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
}

function PasswordInput({
    length = 6,
    includeUppercase = false,
    includeLowercase = false,
    includeNumbers = true,
    includeSymbols = false,
    isOpenSafeKeyword = false,
    width,
    userAgent,
    onChange,
    onComplete,
}: PasswordInputProps) {
    const [propWidth, setPropWidth] = useState<number>(width);
    const [agentName, setAgentName] = useState<string>(userAgent);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [values, setValues] = useState<string[]>(Array(length).fill(''));

    const finalLength = length;

    useEffect(() => {
        if (finalLength < 4) {
            console.error('密码长度必须大于4');
            return;
        }
    }, [finalLength]);

    useEffect(() => {
        const handleResize = () => {
            setPropWidth(window.innerWidth);
            setAgentName(userAgent);
        };

        window.addEventListener('resize', handleResize);
        setPropWidth(width);
        setAgentName(userAgent);

        return () => window.removeEventListener('resize', handleResize);
    }, [width, userAgent]);

    // 安全键盘输入处理
    const handleSafeInput = (value: string) => {
        const filledIndex = values.findIndex(v => v === '');
        if (filledIndex === -1 || filledIndex >= finalLength) return;

        const newValues = [...values];
        newValues[filledIndex] = value;
        setValues(newValues);

        const password = newValues.join('');
        onChange?.(password);

        // 跳转到下一个
        if (filledIndex < finalLength - 1) {
            inputRefs.current[filledIndex + 1]?.focus();
        } else {
            onComplete?.(password);
        }
    };

    // 删除逻辑
    const handleDelete = () => {
        // 找到最后一个有值的位置
        for (let i = finalLength - 1; i >= 0; i--) {
            if (values[i]) {
                const newValues = [...values];
                newValues[i] = '';
                setValues(newValues);
                inputRefs.current[i]?.focus();
                onChange?.(newValues.join(''));
                return;
            }
        }
    };

    // 原生键盘事件（仅用于删除）
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (values[index]) {
                // 当前有值，清空当前
                const newValues = [...values];
                newValues[index] = '';
                setValues(newValues);
                onChange?.(newValues.join(''));
            } else if (index > 0) {
                // 当前无值，跳到前一个并删除
                inputRefs.current[index - 1]?.focus();
                const newValues = [...values];
                newValues[index - 1] = '';
                setValues(newValues);
                onChange?.(newValues.join(''));
            }
        }
    };

    const showNumberInput =
        includeNumbers && !includeUppercase && !includeLowercase && !includeSymbols;

    const showSafeKeypad =
        isOpenSafeKeyword &&
        showNumberInput &&
        propWidth < 768 &&
        agentName !== 'pc';
    

    /**
     * 按键震动函数 
     */
    const triggerVibration = (duration: number) => {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    };

    return (
        <section className={styles.passwordContainer}>
            <div className={styles.top}>
                {showNumberInput ? (
                    <div className={styles.numberOnlyContainer}>
                        {Array.from({ length: finalLength }).map((_, index) => (
                            <div key={index} className={styles.numberOnlyBox}>
                                <input
                                    ref={el => (inputRefs.current[index] = el!)}
                                    type="password"
                                    inputMode="none" // 关键：阻止系统键盘
                                    readOnly // 完全禁用原生输入
                                    maxLength={1}
                                    autoFocus={index === 0}
                                    className={styles.numberOnlyInput}
                                    value={values[index]}
                                    // 禁用所有输入方式
                                    onKeyDown={e => {
                                        if (showSafeKeypad) {
                                            e.preventDefault(); // 安全键盘模式下禁用原生按键
                                        } else {
                                            handleKeyDown(e, index); // 非安全模式下支持 backspace
                                        }
                                    }}
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    onCut={e => e.preventDefault()}
                                    onContextMenu={e => e.preventDefault()}
                                    onSelect={() => { }}
                                />
                                {values[index] && <div className={styles.dot}>•</div>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.normalPasswordContainer}>
                        <input
                            type="password"
                            maxLength={finalLength}
                            className={styles.normalPasswordInput}
                            placeholder="请输入密码"
                        />
                    </div>
                )}
            </div>

            {/* 安全数字键盘 */}
            {showSafeKeypad && (
                <div className={styles.bottom}>
                    <div className={styles.keypad}>
                        {[1, 2, 3].map(num => (
                            <button
                                key={num}
                                type="button"
                                className={styles.keypadBtn}
                                onClick={() => {
                                    handleSafeInput(num.toString());
                                    triggerVibration(50);
                                }}
                            >
                                {num}
                            </button>
                        ))}
                        {[4, 5, 6].map(num => (
                            <button
                                key={num}
                                type="button"
                                className={styles.keypadBtn}
                                onClick={() => {
                                    handleSafeInput(num.toString());
                                    triggerVibration(50);
                                }}
                            >
                                {num}
                            </button>
                        ))}
                        {[7, 8, 9].map(num => (
                            <button
                                key={num}
                                type="button"
                                className={styles.keypadBtn}
                                onClick={() => {
                                    handleSafeInput(num.toString());
                                    triggerVibration(50);
                                }}
                            >
                                {num}
                            </button>
                        ))}
                        <button type="button" className={styles.keypadBtn} disabled></button>
                        <button
                            type="button"
                            className={styles.keypadBtn}
                            onClick={() => {
                                handleSafeInput('0');
                                triggerVibration(50);
                            }}
                        >
                            0
                        </button>
                        <button
                            type="button"
                            className={styles.keypadBtn}
                            onClick={
                                handleDelete
                            }
                        >
                            删除
                        </button>
                    </div>

                    <button
                        type="button"
                        className={styles.completeBtn}
                        onClick={() => onComplete?.(values.join(''))}
                    >
                        完成
                    </button>
                </div>
            )}
        </section>
    );
}

export default PasswordInput;