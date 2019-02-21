import { Resolvers } from '../../../resolvers';
import { AddPlaceResponse, AddPlaceMutationArgs } from '../../../types';
import Place from '../../../entities/Place';

const resolvers: Resolvers = {
    Mutation: {
        AddPlace: async(_, args: AddPlaceMutationArgs, context): Promise<AddPlaceResponse> => {
            const user = context.req.user;

            try {
                //null체크 해줄 필요없다. 왜냐하면 인수로 전달되는 것이 필수여야 하기 때문에.
                await Place.create({ user, ...args}).save();
                return {
                    ok: true,
                    error: null
                };

            } catch (error) {
                return {
                    ok: false,
                    error
                };
            }

        }
    }
}

export default resolvers;