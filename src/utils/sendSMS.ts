import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);



const sendSMS = (to: string, body: string) => { //어떤내용이든 전송
    return twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE
    });
}

export const sendVerificationSMS = (to: string, key: string) => //verification에 관한것만 전송
    sendSMS(to, `Your verification key is ${key}`);