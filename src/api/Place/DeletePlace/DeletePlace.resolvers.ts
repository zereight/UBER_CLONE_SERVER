import { Resolvers } from '../../../resolvers';
import { DeletePlaceResponse, DeletePlaceMutationArgs } from '../../../types';
import Place from '../../../entities/Place';

const resolvers : Resolvers = {
    Mutation: {
        DeletePlace: async(_, args: DeletePlaceMutationArgs, context): Promise<DeletePlaceResponse>=> {

            const user = context.req.user;
            const place = await Place.findOne({id: args.placeId});

            try {
                if(place){
                    if(place.user.id === user.id){
                        await place.remove();
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "삭제하고자하는 유저와 등록된 place가 일치하지 않습니다."
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not Found"
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error
                }
            }

        }
    }
}

export default resolvers;