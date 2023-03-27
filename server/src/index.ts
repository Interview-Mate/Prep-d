import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import router from './router';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';


dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app: Express = express();
const PORT: number = Number(process.env.SERVER_PORT) || 4000;

app
  .use(cors())

  .use(express.json({ limit: '50mb' }))

  .use(router)
  .use(mongoSanitize())
  .use(limiter)
  .use(helmet());


  export default app;
