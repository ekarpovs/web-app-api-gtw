import bodyParser from 'body-parser';
import compression from 'compression';
import connectRedis from 'connect-redis';
import { Application } from 'express';
import session from 'express-session';

import * as env from '../config/environment';

const expressConfig = (app: Application) => {

  // Express configuration
  app.set('uri', env.SERVER_URI);
  app.set('port', env.SERVER_PORT);
  app.set('env', env.ENVIRONMENT);

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const RedisStore = connectRedis(session);
  const opt: session.SessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: env.CLIENT_SECRET || 'defaultSecret',
    store: new RedisStore({
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT || '6379', 10),
      ttl :  260,
      // tslint:disable-next-line:object-literal-sort-keys
      logErrors: ((error: string) => {
        // tslint:disable-next-line:no-console
        console.log('Redis error', error);
      })
    })
  };

  app.use(session(opt));

  // const sessionStore = new session.MemoryStore();

  // app.use(session({
  //   resave: false,
  //   saveUninitialized: true,
  //   secret: env.CLIENT_SECRET,
  //   store: sessionStore
  // }));

  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  //   next();
  // });

};

export default expressConfig;
