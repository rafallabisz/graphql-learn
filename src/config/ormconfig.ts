import { ConnectionOptions } from "typeorm";

const developmentConfig: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: ["src/entity/*.*"],
  synchronize: true,
};

const productionConfig: ConnectionOptions = {
  type: "postgres",
  // url: process.env.POSTGRES_DB_URL,
  // entities: [],
  synchronize: false,
};

const config = process.env.NODE_ENV === "production" ? productionConfig : developmentConfig;

export default config;
