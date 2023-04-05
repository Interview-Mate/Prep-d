
import dotenv from "dotenv";
dotenv.config();


import { dbConnection } from './models/index.models';
import Exercise from './models/exercise';
import populateExerciseCollection from './asset/seedScript';
import app from "./index-test";


const PORT: number = Number(process.env.SERVER_PORT) || 4000;
(async () => {
  try {
    await dbConnection;

    console.log("Connected to DB"); //eslint-disable-line no-console

    const exercises = await Exercise.find();
    if (exercises.length === 0) populateExerciseCollection();


    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`); //eslint-disable-line no-console
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error); //eslint-disable-line no-console

  }
})();

