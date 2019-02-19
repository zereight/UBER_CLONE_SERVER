import { Resolvers } from '../../../resolvers';
import privateResolver from '../../../utils/privateResolver';
import { CompleteEmailVerificationResponse, CompleteEmailVerificationMutationArgs } from '../../../types';
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';



//이메일 변경용 RequestEmailVerification을 완성 시키는 단계.
//이메일로 보낸 EmailVerification 코드(key)를 CompleteEmailVerification으로 보내면 그 키가 존재하고 

const resolvers: Resolvers = {
    Mutation: {
        CompleteEmailVerification: privateResolver(
            async (parent, args: CompleteEmailVerificationMutationArgs, context): Promise<CompleteEmailVerificationResponse> => {
                const user: User= context.req.user;
                const {key} = args;

                if(user.email && !user.verifiedEmail){
                    try {
                        const verification  = await Verification.findOne({
                            payload: user.email,
                            key
                        });

                        if(verification){
                            user.verifiedEmail = true;
                            await user.save();
                            return {
                                ok: true,
                                error: null
                            }
                        } else {
                            return {
                                ok: false,
                                error: "There is no verification. (코드가 맞지 않습니다.)"
                            }
                        }

                    } catch (error) {
                        return {
                            ok: false,
                            error
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "There is no email."
                    }
                }
                
            }
        )
    }
}

export default resolvers;