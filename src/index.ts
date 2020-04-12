import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";
import config from "./ormconfig";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello world!!";
  }
}

const bootstrap = async () => {
  try {
    const connection = await createConnection(config);
    console.log(`Is connected: ${connection.isConnected}`);
  } catch (err) {
    console.log("Error while connecting to the database", err);
    return err;
  }

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  const app = express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
};

bootstrap();
