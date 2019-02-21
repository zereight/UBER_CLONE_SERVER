import { Resolvers } from '../../../resolvers';
import User from '../../../entities/User';
import { GetMyPlaceResponse } from '../../../types';
import privateResolver from '../../../utils/privateResolver';
const resolvers : Resolvers = {
    Query: {
        GetMyPlace: privateResolver( async (_,__, {req}): Promise<GetMyPlaceResponse> => {
            
            try {
                //해당 id중에서 places값과 관계있는 객체를 1개 검색.
                const user = await User.findOne({id: req.user.id}, {relations: ["places"]})
                if(user){
                    return {
                        ok: true,
                        error: null,
                        places: user.places
                    }
                } else {
                    return {
                        ok: false,
                        error: "There is no place",
                        places: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error,
                    places: null
                }
            }

        })
    }
}

export default resolvers;