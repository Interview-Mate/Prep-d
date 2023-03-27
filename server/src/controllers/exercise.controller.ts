import Exercise from '../models/exercise';
import { Request, Response } from 'express';

const getAllExercises = async (req: Request, res: Response) => {
  try {
    const allExercises = await Exercise.find();
    res.status(200).json(allExercises);
  } catch (err) {
    console.log(err);
    res.json(err).status(500);
  }
};

const getExercise = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Exercise.findById(id);
    if (!result) {
      throw new Error('Exercise not found');
    }
    res.json(result).status(200);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export {getAllExercises, getExercise }