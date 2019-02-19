import { Resolvers } from '../../../resolvers';
import { EmailSignUpMutationArgs } from 'src/types';
import { EmailSignUpResponse } from '../../../types';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import sendEmail from '../../../utils/sendEmail';
import Verification from '../../../entities/Verification';

//이메일로 회원가입을 할 때 코드를 발급하고 인증하는 과정.

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
                        //코드인증하고 맡에 토큰생성 및 emailVerification 저장해야함.
                        const token1 = await createJWT(user.id)
                        await emailVerification.save();
                        await sendEmail(
                            user.email,
                            `${user.fullName} Plz verify this email`,
                            "내용",
                            `<p> 인증 코드는 ${emailVerification.key} 입니다.</p>`
                            );
                        
                        
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