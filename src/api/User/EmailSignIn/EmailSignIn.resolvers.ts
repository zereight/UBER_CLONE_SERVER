import {
    Resolvers
} from "src/resolvers";
import {
    EmailSignInMutationArgs,
    EmailSignInResponse
} from '../../../types';
import User from "../../../entities/User";


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

                    if ( await existingUser.compare_PW(password) ){
                        return {
                            ok: true,
                            error: null,
                            token: "Coming soon."
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