import { Resolvers } from '../../../resolvers';
import privateResolver from '../../../utils/privateResolver';
import { GetNearByDriversResponse } from '../../../types';
import User from '../../../entities/User';
import { Between, getRepository } from 'typeorm';


const resolvers : Resolvers = {
    Query: {
        GetNearByDrivers: privateResolver(
            async (_, __, context) : Promise<GetNearByDriversResponse> => {
                
                try {
                    const user: User = context.req.user;
                    const {lastLng, lastLat} = user;
    
                    const drivers: User[] = await getRepository( User ).find({
                        isDriving: true,
                        lastLat: Between(lastLat - 0.05, lastLat + 0.05),
                        lastLng: Between(lastLng - 0.05, lastLng + 0.05)
                    });
    
                    if(drivers){
                        return {
                            ok: true,
                            error: null,
                            drivers
                        }
                    } else {
                        return {
                            ok: true,
                            error: "There are nobody drivers",
                            drivers: null
                        }
                    }
    
                } catch (error) {
                    return {
                        ok: false,
                        error,
                        drivers: null
                    }                
                }
                
    
            }
        )
    }
}

export default resolvers;