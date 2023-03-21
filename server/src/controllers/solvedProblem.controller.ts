import Exercise from '../models/exercise';
import SolvedProblem from '../models/solvedProblem';
import { Request, Response } from "express";


// DB TEST:
// SolvedProblem.insertMany(new SolvedProblem({
//   user_id: "641863bbe8c071eda5e39fbb",
//   problem_id: "6418f04f14cd74f4d7c698ea",
//   solution: "solution test",
//   score: 1,
//   runtime: 22,
//   solveTime: 33
//   }));

exports.addSolvedProblem = async (req: Request, res: Response)=> {
  try {
    let alreadySolved = await SolvedProblem.find({
      "$and": [
        { user_id: req.body.userId,},
        {problem_id: req.body.problemId,}
      ]
    }).lean()

    if(alreadySolved.length > 0){
      let updated = await SolvedProblem.findOneAndUpdate({
          "$and": [
            { user_id: req.body.userId,},
            {problem_id: req.body.problemId,}
          ]
        },
        {
          solution: req.body.solution,
          score: req.body.score,
          runtime: req.body.runtime,
          solveTime: req.body.solveTime
        },
        {
          new: true
        }
      )
      console.log('Solution added');
      res
        .status(201)
        .json(updated);


    } else {

    let problem = await SolvedProblem.create(
      {
        user_id: req.body.userId,
        problem_id: req.body.problemId,
        solution: req.body.solution,
        score: req.body.score,
        runtime: req.body.runtime,
        solveTime: req.body.solveTime
      });
      console.log('Solution added');
      res
        .status(201)
        .json(problem);
     }

  } catch (err: any) {
    res
      .status(403)
      .json(err.message)
  }
};


exports.getAllSolvedProblems = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const problems = await SolvedProblem.find({ user_id: userId }).lean();

    const exercisesIds = problems.map((problem:any) => problem.problem_id);
    const exercisesFromDB = await Exercise.find({ _id: { $in: exercisesIds } }).lean();

    const solvedProblems = await Promise.all(
      problems.map(async (problem:any) => {
        const exercise = exercisesFromDB.find(
          ex => ex._id.toString() === problem.problem_id.toString()
        );

        return { ...problem, exercise };
      })
    );
      console.log(solvedProblems)
    res
      .status(200)
      .json(solvedProblems);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json(err.message);
  }
};



//________________________________________________________________________

// async function getUnionData() {
//     let unionData = await SolvedProblem.aggregate([
//       { $unionWith: { coll: 'exercises' } },
//       { $match: { id: 'problem_id' } },
//     ]);
//     console.log('uniondata:', unionData);
// }
//________________________________________________________________________


//  async function getUnionData1() {
//     let solvedProblemByUser =await SolvedProblem.aggregate(
//     [{
//       $lookup:
//       {
//         from: 'solvedproblems',
//         localField: 'problem_id',
//         foreignField: '_id',
//         as: 'solved_problems_by_user'
//       }
//     }]
//   )
//   console.log('solvedProblemByUser: ',solvedProblemByUser)
// }
// getUnionData1()

//________________________________________________________________________

// async function getLookupData() {
//   const lookupData = await SolvedProblem.aggregate([
//     {
//       $lookup: {
//         from: 'exercises',
//         localField: 'problem_id',
//         foreignField: '_id',
//         as: 'problemsss'
//       }
//     },
//     { $unwind: '$problemsss' },
//   ])
//   console.log('lookupData:' ,lookupData);
// }
// getLookupData();