import { Resolvers } from '../../../resolvers';
import privateResolver from '../../../utils/privateResolver';
import { RequestEmailVerificationResponse } from '../../../types';
import Verification from '../../../entities/Verification';
import sendEmail from '../../../utils/sendEmail';
// 사용자가 이메일을 변경하고 싶을 때, 이미 가지고 있는 이메일을 검증하는 과정.

const resolvers : Resolvers = {
    Mutation: {
        RequestEmailVerification: privateResolver(async (parent, args, context): Promise<RequestEmailVerificationResponse> => {
            try{
                const {req} = context;
                const {email} = req;
                if(email){
                    const oldVerification = await Verification.findOne({payload: email}); //emailVerification은 애초에 payload에 email을 저장하도록 만들었으니 payload에 email넣어주는것.

                    if(oldVerification) {
                        await oldVerification.remove();
                    } 

                    const newVerification = await Verification.create({
                        payload: email,
                        target: "EMAIL"
                    }).save();

                    sendEmail(
                        email,
                        `Hi ${req.user.fullname}! Please Verfy this email`,
                        `Your code is ${newVerification.key}`
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