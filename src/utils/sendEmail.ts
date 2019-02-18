import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"naver",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PW
    }
});

const mailOption = {
    from: process.env.MY_EMAIL,
    to: "누구에게 보낼것인가?",
    subject: "제목입니다.",
    text: "",
    html: `<p></p>`
};

const sendEmail = async (to, title, text="", html="<p></p>"): Promise<void> => {
    mailOption.to = to;
    mailOption.subject = title;
    mailOption.html = html;
    mailOption.text = text;

    transporter.sendMail(mailOption, (err,info)=>{if(err){console.log(err);} else {console.log("Email is sent");}});
    transporter.close();
}

export default sendEmail;