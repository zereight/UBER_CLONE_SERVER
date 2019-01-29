import { Greeting } from "../../../types";

const resovlers = {
    Query : {
        sayBye: (): Greeting => {
            return {
                text: "Say Bye",
                error: false
            }
        }
    }
};

export default resovlers;