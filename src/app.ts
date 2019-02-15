
import { GraphQLServer } from "graphql-yoga";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";

import schema from "./schema"
import decodeJWT from './utils/decodeJWT';
import { NextFunction, Response } from "express";

class App{
    public app : GraphQLServer;

    constructor(){
        this.app = new GraphQLServer({
            schema,
            context: req => {
                console.log("TEST")
                console.log(req.request);
                return {
                    req: req.request
                };
            }
        });

        this.middlewares();
    }

    private middlewares = () : void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
    }

    //왜 jwt는 jwt()로 안썼는가? => 그냥 함수명만 쓰게 되면 express.use() 가 실행된 후 실행되나 ()를 쓰면 그 자리에서 실행되고 express.use()가 실행된다.

    private jwt = async (req, res: Response, next: NextFunction):Promise<void> => {
        //request가 무엇을 갖고 있는지 확인하고
        //그에 대한 Response가 정의되어 있다면 그것을 전송하고
        //request가 아무것도 갖고 있지 않으면 next로 다음 미들웨어가 실행됨.
        const token = req.get("X-JWT");
        //지금 상황에서는 graphql playground에서
        //내가 직접 FacebookConnect로 mutation요청 했을때 발급받은 token을
        //페이지및 하단 http header에 
        //{"X-JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUwMTQ0NzAxfQ.dT8t7C_FjHxADTYrTjizoETf3Wr2MIM1yybWRHCRSJQ"}
        //이런식으로 넣어줄거임. 그러면 request로 이게 전달되고 X-JWT를 get해서 token을 읽어올거임
        //http header에 적는 순간 실시간으로 등록되어
        //그 토큰을 입력 했을 때 그 토큰의 user정보가 콘솔창에 출력될거임.
        if(token){
            const user = await decodeJWT(token);

            if(user){
                req.user = user; //request user라는 속성을 할당해주고 거기에 우리가 해독한 user를 대입 => request에 유저정보 실어서 graphql-server까지 운반
                console.log("user is existing.")
                console.log(req.user);
            } else {
                req.user = undefined;
            }

        }
        next();
    };
}

export default new App().app;