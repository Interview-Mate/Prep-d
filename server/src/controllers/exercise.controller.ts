import  Exercise  from '../models/exercise';
import { Request, Response } from "express";

// TODO: method that returns problems sorted by level
// beginner[
//   {
//    problemName: "Simple addition",
//    problem_id: "37497"
//   },
// ]

exports.getExercise = async (req:Request, res: Response) => {
  try{
    //  TODO: maybe name
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



exports.addExerciseToInterview = async  (req: Request, res: Response)=> {
//moved to interview.controller
}

