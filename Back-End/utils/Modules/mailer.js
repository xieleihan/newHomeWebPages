require('dotenv').config({ path: '../../.env' });
const transporter = require('./sendEmail');

const qq = require('./qq');

const PROJECT_NAME = qq.name;
const FROM_EMAIL = qq.email;

const mailer = async (client_email,email_code) => {
    const email = {
        title: `${PROJECT_NAME}---邮箱验证码`,
        body: `
<div style="width: 400px;height: 50px;display: flex;flex-direction: row ;align-items: center;">
<img style="width:50px;height:50px;margin-right: 10px;" src="https://github.com/xieleihan/QingluanSearch-AndroidDev/raw/main/peacock_flat.png" alt="" />
<span style="font-weight: bold;font-family: kaiti;">南秋SouthAki<span style="font-family: kaiti;letter-spacing: 15px;color: #ccc;display: block;margin-left: 10px;font-size: 12px;">邮箱验证平台</span></span>
</div>
<h1>您好：</h1>
<p style="font-size: 18px;color:#000;">
您的验证码为：
<span style="font-size: 16px;color:#f00;"><b>${email_code}</b>,</span>
<p>您当前正在使用${PROJECT_NAME}的邮箱验证服务，验证码告知他人将会导致数据信息被盗，请勿泄露!
</p >
<p>他人之招,谨防上当受骗.</p >
</p >
<p style="font-size: 1.5rem;color:#999;">3分钟内有效</p >
`
    };

    const emailContent = {
        from: FROM_EMAIL,
        to: client_email,
        subject: email.title,
        html: email.body,
    };

    return transporter.sendMail(emailContent);
};

module.exports = mailer;