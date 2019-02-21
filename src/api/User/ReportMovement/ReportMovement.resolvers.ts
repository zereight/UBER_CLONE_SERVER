import { Resolvers } from '../../../resolvers';
import privateResolver from '../../../utils/privateResolver';
import { ReportMovementResponse, ReportMovementMutationArgs } from '../../../types';
import User from '../../../entities/User';


const resolvers: Resolvers = {
    Mutaion: {
        ReportMovement: privateResolver( 
            async (_, args: ReportMovementMutationArgs, {req}): Promise<ReportMovementResponse> => {
                const user: User = req.user;
                const notNull = {};
                await  Object.keys(args).forEach(key => {
                    if(args[key] != null){
                        notNull[key] = args[key];
                    }
                });

                try {
                    //BeforeInsert부분이 실행될 필요가없다.(패스워드 업뎃이 아니므로) 그래서 객체따로 호출안해줘도됨.
                    //참고로 update의 인수는 (기준, 나머지 값) 해당 id인 User를 notNull로 업뎃.
                    await User.update({id: user.id}, {...notNull});
                    return {
                        ok:true,
                        error: null
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