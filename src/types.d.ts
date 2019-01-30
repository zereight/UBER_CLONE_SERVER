export const typeDefs = ["type Greeting {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  sayBye: Greeting!\n  sayHello(name: String!): String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: Greeting;
  sayHello: string;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface Greeting {
  text: string;
  error: boolean;
}
