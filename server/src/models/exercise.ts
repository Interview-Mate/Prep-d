import {mongoose} from './index.models';



const exerciseSchema = new mongoose.Schema({
  question: String,
  tests:[ //TODO alternatively, let everything be handled by chatGPT
  {
      input_parameters:Array,
      test:String,
      expected_output:Array,
    }
  ]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;

