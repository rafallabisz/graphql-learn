import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import config from './config/ormconfig';
import { RegisterResolver } from './modules/user/Register';
import config_api from './config';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';
import { LoginResolver } from './modules/user/Login';

const bootstrap = async () => {
  try {
    const connection = await createConnection(config);
    console.log(`Is connected: ${connection.isConnected}`);
  } catch (err) {
    console.log('Error while connecting to the database', err);
    return err;
  }

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  const app = express();
  const RedisStore = connectRedis(session);

  //middlewares
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hours
      },
    }),
  );

  apolloServer.applyMiddleware({ app });
  app.listen(config_api.port, () => {
    console.log(`Server started on ${config_api.API_URI}`);
  });
};

bootstrap();
