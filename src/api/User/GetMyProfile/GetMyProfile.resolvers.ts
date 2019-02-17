import { Resolvers } from '../../../resolvers';
import { GetMyProfileResponse } from '../../../types';
import privateResolver from '../../../utils/privateResolver';

const resolvers : Resolvers = {
    Query: {
        GetMyProfile: privateResolver( //함수 1개를 넘겨줌.
                async (parent, args, context) : Promise<GetMyProfileResponse> => {
                const user = context.req.user;
        
                return {
                    ok: true,
                    error:null,
                    user
                };
        
            }
        )
    }
}

export default resolvers;