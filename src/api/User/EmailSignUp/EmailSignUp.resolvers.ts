import { Resolvers } from '../../../resolvers';
import { EmailSignUpMutationArgs } from 'src/types';
import { EmailSignUpResponse } from '../../../types';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import { transporter, mailOption } from '../../../utils/sendEmail';
import Verification from '../../../entities/Verification';

const resolvers: Resolvers= {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {

            const {email} = args;

            try {
                const existingUser = await User.findOne({email});

                if(existingUser){
                    return {
                        ok: false,
                        error: "You should log in instead.",
                        token: null
                    }
                } else {
                    const phoneVerification = await Verification.findOne({
                        payload: args.phoneNumber,
                        verified: true
                    });
                    if (phoneVerification) {
                        const user = await User.create({...args}).save();
                        const emailVerification = await Verification.create({
                            payload: args.email,
                            target: "EMAIL"
                        });
                        if(user.email){
                            mailOption.to = user.email;
                            mailOption.subject = "Please Verify this email.";
                            mailOption.html = `<p>이 링크로 인증해주세요. 인증 코드는 ${emailVerification.key} 입니다.</p>`
                        }
                        await transporter.sendMail(mailOption,  (error,info): void => {
                            if(error){ console.log(error); } else { console.log("Email is sent") }
                            transporter.close();
                        })
                        const token1 = createJWT(user.id)

                        return {
                            ok: true,
                            error: null,
                            token: token1
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Please verify phoneNumber first",
                            token: null
                        };
                    }

                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

        }
    }
};

export default resolvers;