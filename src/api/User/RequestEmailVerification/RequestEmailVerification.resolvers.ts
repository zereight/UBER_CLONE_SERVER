import { Resolvers } from '../../../resolvers';
import privateResolver from '../../../utils/privateResolver';
import { RequestEmailVerificationResponse } from '../../../types';
import Verification from '../../../entities/Verification';
import sendEmail from '../../../utils/sendEmail';
import User from '../../../entities/User';
// 사용자가 이메일을 변경하고 싶을 때, 이미 가지고 있는 이메일을 검증하는 과정.

const resolvers : Resolvers = {
    Mutation: {
        RequestEmailVerification: privateResolver(
            async (parent, args, context): Promise<RequestEmailVerificationResponse> => {
            try{
                const user :User= context.req.user;
                if(user.email){
                    const oldVerification = await Verification.findOne({payload: user.email}); //emailVerification은 애초에 payload에 email을 저장하도록 만들었으니 payload에 email넣어주는것.

                    if(oldVerification) {
                        console.log("oldVerfication is removed")
                        await oldVerification.remove();
                    } 

                    const newVerification = await Verification.create({
                        payload: user.email,
                        target: "EMAIL"
                    }).save();

                    await sendEmail(
                        user.email,
                        `Hi ${user.fullName}! Please Verfy this email`,
                        "내용",
                        `<p>Your email code is ${newVerification.key}</p>`
                        );

                    return {
                        ok: true,
                        error: null
                    }
                } else {
                    return {
                        ok: false,
                        error: "You hava not email"
                    }
                }
            } catch(error) {
                return {
                    ok: false,
                    error
                }
            }
          }
        )
            
        
    }
}

export default resolvers;