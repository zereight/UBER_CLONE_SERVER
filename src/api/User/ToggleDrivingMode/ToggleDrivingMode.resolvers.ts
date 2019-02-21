import { Resolvers } from '../../../resolvers';
import User from '../../../entities/User';
import { ToggleDrivingModeResponse } from '../../../types';

const resolvers: Resolvers = {
    Mutation: {
        ToggleDrivingMode: async (_, __, {req}): Promise<ToggleDrivingModeResponse> => {

            try {
                const user: User = req.user;

                user.isDriving = !user.isDriving;
                user.save();

                return {
                    ok: true,
                    error: null
                };
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