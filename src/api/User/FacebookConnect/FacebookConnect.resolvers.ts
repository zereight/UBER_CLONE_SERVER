import {
    Resolvers
} from '../../../resolvers';
import {
    FacebookConnectResponse,
    FacebookConnectMutationArgs
} from '../../../types';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {

    Query: {
        user: (parent, args, context)=> {
            console.log("In Resolver");
            console.log(context.req.user);
            return "";
        }
    },

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
                    const token1 = createJWT(existingUser.id);
                    return {
                        ok: true,
                        error: null,
                        token: token1
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
                const newUser =await User.create({
                    ...args,
                    profilePhoto: `http://graph.facebook.com/${fbId}/?fields=picture&type=large`
                }).save();

                const token2 = createJWT(newUser.id);

                return {
                    ok: true,
                    error: null,
                    token: token2
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