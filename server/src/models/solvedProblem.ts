import {mongoose} from './index.models';

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


