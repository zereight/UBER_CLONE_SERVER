import { Resolvers } from '../../../resolvers';
import { EmailSignUpMutationArgs } from 'src/types';
import { EmailSignUpResponse } from '../../../types';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

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
                    const user = await User.create({...args}).save();
                    
                    const token1 = createJWT(user.id)

                    return {
                        ok: true,
                        error: null,
                        token: token1
                    };
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