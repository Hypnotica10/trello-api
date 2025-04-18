import cors from 'cors';
import express from 'express';
import { env } from '~/config/environment';
import { CONNECT_DB } from '~/config/mongodb';
import { errorHandlingMiddleware } from '~/middlewares/errorHandler';
import { noResourceFound } from '~/middlewares/globalError';
import { APIs_V1 } from '~/routes/v1';
import { corsOptions } from './config/cors';

const START_SERVER = () => {
  const app = express()
  const HOST = env.HOST;
  const PORT = env.PORT;

  // Allow CORS
  app.use(cors(corsOptions))

  // Use Cookie
  // app.use(cookieParser())

  //Enable req.body json
  app.use(express.json());

  app.use('/v1', APIs_V1);

  // Handle No Resource Found
  app.use(noResourceFound);

  // middleware handle error
  app.use(errorHandlingMiddleware);

  app.listen(PORT, HOST, () => {
    console.log(`Server is running at ${HOST}:${PORT}`);
  })
}

(async () => {
  try {
    await CONNECT_DB();
    // GET_DB();
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})()
