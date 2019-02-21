//운전자의 운전상태를 온/오프 하는기능이다.
import { Resolvers } from '../../../resolvers';
import User from '../../../entities/User';
import { ToggleDrivingModeResponse } from '../../../types';

const resolvers: Resolvers = {
    Mutation: {
        //privateResolver 써도 되는데 내 스타일대로 하기 위해서 안썼다.
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