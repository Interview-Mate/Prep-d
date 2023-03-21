import {mongoose} from './index.models';

// levels = {
//   1: 'Beginner',
//   2: 'Intermediate',
//   3: 'Advanced',
//   4: 'Expert',
// };

const exerciseSchema = new mongoose.Schema({
  name: String, //Simple addition
  description: String,
  hint: String,
  function: String,
  solution1: [],
  solution2: [],
  solution3: [],
  language: String,
  level: Number,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;



