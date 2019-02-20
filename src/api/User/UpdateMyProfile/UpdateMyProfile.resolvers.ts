import { Resolvers } from '../../../resolvers';
import { UpdateMyProfileResponse, UpdateMyProfileMutationArgs } from '../../../types';
import User from '../../../entities/User';

/* 사용자가 사용자 정보중 몇개를 수정하고 싶을 때를 위한 것. */

const resolvers : Resolvers = {
    Mutation: {
        UpdateMyProfile: async (parent, args: UpdateMyProfileMutationArgs, context) : Promise<UpdateMyProfileResponse> => {
            const user: User = context.req.user;

            const notnull: any = {};
            

            //args객체를 enumerable한 객체로 바꿔주고(key: item꼴) forEach로 각 key에대한 값이 null인지 체크 후 notnull의 같은 속성값에 저장.
            await Object.keys(args).forEach( key => {
                if(args[key] !== null) {
                    notnull[key] = args[key];
                }
            } );

            try {

                //User entity에 보면 BeforeUpdate즉 업데이트 전에 비밀번호 해싱이 일어나는데,
                //BeforeUpdate는 그 유저객체가 호출되어 변경되었을떄 실행된다.
                //User.Update만으로 만약 비밀번호를 바꾸었을 경우, 해당 유저객체가 직접 호출되지 않았으므로
                //비밀번호가 새로 해싱되지 않는다. 그래서 아래 if부분을 추가한다.
                //그리고 비밀번호가 변수에 남아있으면 위험하므로 바로 메모리해제.
                if(notnull.password != null){ 
                    user.password = notnull.password;
                    user.save();
                    delete notnull.password;
                }

                await User.update( {id: user.id}, {...notnull} ) ;
                return {
                  ok: true,
                  error: null
                };
              } catch (error) {
                return {
                  ok: false,
                  error: error.message
                };
              }
            
        }
    }
}

export default resolvers;