import { Resolvers } from '../../../resolvers';
import privateResolver from '../../../utils/privateResolver';
import { EditPlaceResponse, EditPlaceMutationArgs } from '../../../types';
import Place from '../../..//entities/Place';

const resolvers : Resolvers = {
    Mutation : {
        EditPlace: privateResolver(
            async(_, args: EditPlaceMutationArgs, context): Promise<EditPlaceResponse> => {
                const user = context.req.user;

                try {
                    const place_temp = await Place.findOne({id: args.placeId});
                    if(place_temp){ //인수로 받은 id를 가진 Place가 존재하고
                        if(place_temp.user.id === user.id) { //X-JWT로 받은 유저의 id와 일치한다면 수정가능
                            const notNull = {};
                            await Object.keys(args).forEach(
                                k => {
                                    if(args[k] !== null) {
                                        notNull[k] = args[k];
                                    }
                                }
                            );

                            await Place.update({id: args.placeId}, {...notNull});
                            return {
                                ok: true,
                                error: null
                            }
                        } else {
                            return {
                                ok: false,
                                error: `인수의 Place id랑 JWT의 user.id랑 다릅니다.`
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: `There is no place, having ${args}`
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error
                    }
                }

            }
        )
    }
}

export default resolvers;