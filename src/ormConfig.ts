import { ConnectionOptions } from "typeorm";

const cO : ConnectionOptions = {
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],
    type: "postgres",
    host: process.env.DB_ENDPOINT,
    port: 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};

export default cO;