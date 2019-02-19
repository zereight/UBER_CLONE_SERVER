import { Resolvers } from '../../../resolvers';
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from '../../../types';
import Verification from '../../../entities/Verification';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

//StartPhoneVerification에서 인증해줬으면 key를 발급 받았을 것이고, 여기선 phoneVerification을 발급해주는 과정.

const resolvers: Resolvers =  {
    Mutation: {
        CompletePhoneVerification: async (_,
             args: CompletePhoneVerificationMutationArgs)
             : Promise<CompletePhoneVerificationResponse> => {

                const {phoneNumber, key} = args;

                try {
                    const verification = await Verification.findOne({
                        payload: phoneNumber,
                        key
                    });

                    if(!verification){
                        return {
                            ok: false,
                            error: "Verification key not valid",
                            token: null
                        };
                    } else {
                        verification.verified = true;
                        await verification.save();
                    }

                } catch (error) {
                    return {
                        ok:false,
                        error:error.message,
                        token:null
                    };
                }


                try {
                    const user = await User.findOne({phoneNumber});

                    if(user) { //유저가 존재하면 그 유저 토큰 반환
                        user.verifiedPhonenumber = true;
                        await user.save();

                        const token1 = await createJWT(user.id)

                        return {
                            ok:true,
                            error: null,
                            token: token1
                        }
                    } else { //유저가 존재하지 않으면 그냥 폰인증만 된채로 놔둠. EmailSignUp에서 유저 생성할거니 ㅇ
                        return {
                            ok: true,
                            error: null,
                            token: null
                        }
                    }

                } catch (error) {
                    return {
                        ok:false,
                        error:error.message,
                        token:null
                    };
                }

        }
    }
}

export default resolvers;