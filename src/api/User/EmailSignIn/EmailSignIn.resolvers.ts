import {
    Resolvers
} from "src/resolvers";
import {
    EmailSignInMutationArgs,
    EmailSignInResponse
} from '../../../types';
import User from "../../../entities/User";
import createJWT from '../../../utils/createJWT';

//이메일로 로그인을 할때 저장된 PW와 일치하는지 확인하는 과정.

const resolvers: Resolvers = {
    Mutation: {
        EmailSignIn: async (
            _,
             args: EmailSignInMutationArgs
            ): Promise < EmailSignInResponse > => {

            
                const {email, password} = args;

                try {
                    const existingUser = await User.findOne({email});
                    if(!existingUser){
                        return {
                            ok: true,
                            error: "User is not existing.",
                            token: null
                        };
                    };

                    const checkedPW= await existingUser.compare_PW(password);

                    if ( checkedPW ){

                        const token1 = createJWT(existingUser.id)

                        return {
                            ok: true,
                            error: null,
                            token: token1
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Wrong Password",
                            token: null
                        }
                    }


                    
                } catch (error) {
                    return {
                        ok: true,
                        error: error.message,
                        token: null
                    }
                }

        }
    }
}

export default resolvers;