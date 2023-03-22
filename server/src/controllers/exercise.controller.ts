import  Exercise  from '../models/exercise';
import { Request, Response } from "express";


exports.getAllExercises = async (req: Request, res: Response) => {
  try {
    let allExercises= await Exercise.find();
    res
      .status(200)
      .json(allExercises);
  } catch (err) {
    console.log(err);
    res
      .json(err)
      .status(500);
  }
};

exports.getExercise = async (req:Request, res: Response) => {
  try{
    let id = req.params.id;
    let result = await Exercise.findById(id);
    if (!result) {
      throw new Error("Exercise not found");
    }
    res
    .json(result)
    .status(200)
  } catch (err:any){
    res
      .status(500)
      .json(err.message)
  }
}

exports.getAllExercises = async (req: Request, res: Response) => {
  try {
    let allExercises= await Exercise.find();
    res
      .status(200)
      .json(allExercises);
  } catch (err) {
    console.log(err);
    res
      .json(err)
      .status(500);
  }
};



