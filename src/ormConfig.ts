import { ConnectionOptions } from "typeorm";

const cO : ConnectionOptions = {
    database: "kdh",
    synchronize: true, //서버가 시작할 때 마다 동기화 하겠다.
    logging: true,
    entities: ["entities/**/*.*"],
    type: "postgres",
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};

export default cO;