import {mongoose} from './index.models';

// userId: string,
// problemId: string,
// solution: string,
// score: number,
// runtime: number,
// solveTime: number



const solvedProblemSchema = new mongoose.Schema({
  user_id: String,
  problem_id: String,
  solution: String,
  score: Number,
  runtime: Number,
  solveTime: Number
});

const SolvedProblem = mongoose.model('SolvedProblem', solvedProblemSchema);
export default SolvedProblem;


