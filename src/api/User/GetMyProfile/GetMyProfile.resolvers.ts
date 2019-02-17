import { Resolvers } from '../../../resolvers';
import { GetMyProfileResponse } from '../../../types';

const resolvers : Resolvers = {
    Query: {
        GetMyProfile: async (parent, args, context) : Promise<GetMyProfileResponse> => {
            const user = context.req.user;
    
            return {
                ok: true,
                error:null,
                user
            };
    
        }
    }
}

export default resolvers;