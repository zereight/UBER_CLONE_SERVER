import { Resolvers} from '../../../resolvers';
import Verification from '../../../entities/Verification';
//import { sendVerificationSMS } from '../../../utils/sendSMS';
import {
    StartPhoneVerificationMutationArgs,
    StartPhoneVerificationResponse
} from '../../../types';

// 새로 폰번호 인증을 요청할때의 과정

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: async ( //언제 시작될지 예측이 불가한 함수는 다 async처리하면 되겠군.
            _, 
            args: StartPhoneVerificationMutationArgs): 
            Promise<StartPhoneVerificationResponse> => {
                
                const {phoneNumber} = args;

                try {
                    const existingVerification = await Verification.findOne({payload: phoneNumber});
                    if( existingVerification ){
                        existingVerification.remove();
                    }
                    const newVerification = await Verification.create({payload: phoneNumber, target: "PHONE"});
                    await newVerification.save();
                    //twilio안쓰고 콘솔창에 키뜨게 하려고 주석처리 해둠.
                    //await sendVerificationSMS(newVerification.payload, newVerification.key); 
                    console.log("당신의 폰 키는 "+newVerification.key);
                    return {
                        ok: true,
                        error: null
                    }

                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }
        }
    }
}

export default resolvers;