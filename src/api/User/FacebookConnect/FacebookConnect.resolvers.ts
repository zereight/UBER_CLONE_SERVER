import {
    Resolvers
} from '../../../resolvers';
import {
    FacebookConnectResponse,
    FacebookConnectMutationArgs
} from '../../../types';
import User from '../../../entities/User';

const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async (
            _, args: FacebookConnectMutationArgs
        ): Promise < FacebookConnectResponse > => {
            const {
                fbId
            } = args;

            try {
                //async함수 내의 함수에는 await를 붙여주는게 안전하구나.
                const existingUser = await User.findOne({
                    fbId
                });

                if (existingUser) {
                    return {
                        ok: true,
                        error: null,
                        token: "Coming soon, already"
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

            try {
                await User.create({
                    ...args,
                    profilePhoto: `http://graph.facebook.com/${fbId}/?fields=picture&type=large`
                }).save();

                
                return {
                    ok: true,
                    error: null,
                    token: "Comming soon, created!"
                };
                

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

        }
    }
}

export default resolvers;