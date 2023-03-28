
import { dbConnection } from './models/index.models';
import Exercise from './models/exercise';
import populateExerciseCollection from './asset/seedScript';
import app from "./index";

import dotenv from 'dotenv';
dotenv.config()

const PORT: number = Number(process.env.SERVER_PORT) || 4000;
(async () => {
  try {
    await dbConnection;

    console.log('Connected to DB');

    const exercises = await Exercise.find();
    if (exercises.length === 0) populateExerciseCollection()


    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

