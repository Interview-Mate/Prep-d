import {mongoose} from './index.models';

const solvedProblemSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  problem_id: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  score: Number,
  runtime: Number,
  solveTime: Number
});

const SolvedProblem = mongoose.model('SolvedProblem', solvedProblemSchema);
export default SolvedProblem;


