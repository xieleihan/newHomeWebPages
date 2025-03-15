// 导入样式
import styles from '../style/RegisterPages.module.scss';

// 导入antd design的组件
import { Form, Input, Button, message,Flex } from 'antd';

// 导入请求
import { getImgVerify } from '../api/request';

// 导入React
import { useEffect, useState } from 'react';

// 导入html-react-parser
import parse from "html-react-parser";

function RegisterPages() {
    // 创建React的变量
    const [imgSvgData, setImgSvgData] = useState<string | undefined>("");
    const [sendEmailStr, setSendEmailStr] = useState<string | undefined>("获取验证码");
    const [isCounting, setIsCounting] = useState(false); // 是否正在倒计时

    const [messageApi, contextHolder] = message.useMessage();

    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    // render函数
    const HtmlRenderer = ({ htmlString = "" }: { htmlString?: string }) => {
        return (
            <>
                {/* 限制高度 */}
                {parse(htmlString)}
            </>
        );
    };

    function createImgVerify() {
        getImgVerify({}).then((res) => {
            setImgSvgData(res.data);
        }).catch((res) => {
            error(res.message);
        });
    }

    // 创建生命周期
    useEffect(() => {
        createImgVerify();
    }, []);

    return (
        <>
            <div className={styles.register}>
                
                {contextHolder}
                <div className={styles.container}>
                    <div className={styles.registerBox}>
                    <p className={styles.title}>注册</p>
                    <p className={styles.enTitle}>Regiter</p>
                    <p className={styles.desc}>前往新世界中</p>
                    <Form>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: '请输入邮箱' }]}
                        >
                            <Input placeholder="邮箱" />
                        </Form.Item>
                        <Form.Item
                            name="emailVerify"
                            rules={[{ required: true, message: '请输入邮箱验证码' }]}
                        >
                            <Input maxLength={6} style={{ width: '50%' }} placeholder="邮箱验证码" />
                            <Button
                                disabled={isCounting ? true : false}
                                onClick={() => {
                                if (isCounting) return; // 如果正在倒计时，则不执行

                                messageApi.success("发送成功");
                                setIsCounting(true); // 标记倒计时开始

                                let time = 60;
                                setSendEmailStr(`请在${time}s后再试`);

                                let timer = setInterval(() => {
                                    time--;
                                    setSendEmailStr(`请在${time}s后再试`);
                                    if (time === 0) {
                                        clearInterval(timer);
                                        setSendEmailStr("重新获取");
                                        setIsCounting(false); // 倒计时结束，允许再次点击
                                    }
                                }, 1000);
                            }} style={{ width: '50%' }} className={styles.getCode}>{ sendEmailStr }</Button>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="密码" />
                        </Form.Item>
                        <Form.Item
                            name="configpassword"
                            rules={[{ required: true, message: '请再次输入密码' }]}
                        >
                            <Input.Password placeholder="确认密码" />
                        </Form.Item>
                        <Form.Item
                            name="imgVerify"
                            rules={[{ required: true, message: '请输入图片验证码' }]}
                        >
                            <Flex style={{ width: "100%" }} align="center">
                                <Input maxLength={6} style={{ width: "50%" }} placeholder="图片验证码" />
                                <div onClick={() => {
                                    createImgVerify();
                                }} style={{ width: "50%", height: "30px", display: "flex", alignItems: "center", justifyContent: "center",overflow:"hidden" }}>
                                    <HtmlRenderer htmlString={imgSvgData} />
                                </div>
                            </Flex>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.registerBtn}
                            >
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPages;