import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service:"naver",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PW
    }
});

export const mailOption = {
    from: process.env.MY_EMAIL,
    to: "누구에게 보낼것인가?",
    subject: "제목입니다.",
    text: "",
    html: `<p></p>`
};

