import styles from './styles/LiquidglassSwitchButton.module.scss';

// 引入React的useId生成唯一id
import { useId } from 'react';

// 受控模式
interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function LiquidglassSwitchButton({ checked, onChange }: Props) {
    const id = useId();
    return (
        <>
            <input
                checked={checked}
                onChange={(e) => {
                    onChange(e.target.checked);
                    if (navigator.vibrate) { 
                        navigator.vibrate(10); // 震动10毫秒
                    }
                }}
                type="checkbox"
                id={id}
                role="switch"
                aria-checked={checked}
            />
            <label htmlFor={id} className={styles.slider}><span className={styles.knob}></span></label>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
                        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                        <feDisplacementMap in="SourceGraphic" in2="blurred" scale="77" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        </>
    );
}


export default LiquidglassSwitchButton;