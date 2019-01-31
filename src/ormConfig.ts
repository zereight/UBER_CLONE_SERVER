import { ConnectionOptions } from "typeorm";

const cO : ConnectionOptions = {
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],
    type: "postgres",
    host: process.env.DB_ENDPOINT || "localhost",
    port: 5433,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1234"
};

export default cO;