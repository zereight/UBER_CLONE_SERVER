import { SayHelloQueryArgs } from "../../../types";

const resovlers = {
    Query : {
        sayHello: (_parent : any, args : SayHelloQueryArgs, _context : any) : string => {
            return `say hello ${args.name}`
        }
    }
};

export default resovlers;