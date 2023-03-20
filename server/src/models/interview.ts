import { mongoose } from './index.models';

const interviewSchema = new mongoose.Schema({
  //TODO: user_id instead of username??
  username: {
    type: String,
    required: true,
  },
  score: Number,
  date: {
    type: Date, default: () => Date.now()
   },
  cloud_url: String,
  questions: [
        {
          timestamp: {
            type: Date, default: () => Date.now()
          },
          question_text: String, // text from chatGTP answer
          answer_text: String, // text extracted from user uploaded audio file or
          answer_audio_url:String, // url of audio asset
          score: Number,
        },
      ],
});

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;

