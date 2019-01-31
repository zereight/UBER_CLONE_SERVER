import app from "./app"
import { Options } from "graphql-yoga";
import  cO  from "./ormConfig"; 
import { createConnection } from "typeorm";

const PORT : number | string = process.env.PORT || 4000;
const GRAPHQL_ENDPOINT : string = "/graphql";
const PLAYGROUND : string = "/playground";


const appOptions : Options = {
    port: PORT,
    endpoint: GRAPHQL_ENDPOINT,
    playground: PLAYGROUND
};

const print_strat  = () : void => {
    console.log(`This server started on PORT : ${PORT}`);
}

createConnection(cO).then( ():void => {
    app.start(appOptions, print_strat);
} );
