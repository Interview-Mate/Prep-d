import Exercise from '../models/exercise';
import { Request, Response } from 'express';

const getAllExercises = async (req: Request, res: Response) => {
  try {
    const allExercises = await Exercise.find();
    if(allExercises.length < 1){
      throw new Error ('No coding challenges found')
    }
     res
      .status(200)
      .json(allExercises);
  } catch (err: any) {
    console.log(err);
    res
      .status(500)
      .json(err.message);
  }
};

const getExercise = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Exercise.findById(id);
    if (!result) {
      throw new Error('Challenge not found');
    }
    res
      .status(200)
      .json(result);
  } catch (err: any) {
    res
      .status(500)
      .json(err.message);
  }
};

export {getAllExercises, getExercise }