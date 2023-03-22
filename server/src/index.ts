import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './router';
import {dbConnection} from './models/index.models';
import populateExerciseCollection from './seedScript';

dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.SERVER_PORT) || 4000;

app
  .use(cors())
  .use(express.json({limit: '50mb'})) // TODO: check limit
  .use(router);

(async () => {
  try {
    await dbConnection;
    console.log('Connected to DB');
   // populateExerciseCollection(); //WARN: populates the exercises collection; execute just once
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
})();


