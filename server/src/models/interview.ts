import { mongoose } from './index.models';

const interviewSchema = new mongoose.Schema({
  userna_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date, default: () => Date.now()
   },
  cloudinary_url: String,

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
    score: Number,

});

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;


const userResponce = {
  cloudinary_url: String,
  text: String,
  interview_id: String,
  timestamp: {
    type: Date, default: () => Date.now()
  },
}

const AssistantResponce = {
  feedback: String,
  grade: Number,
  next_question: String,
  interview_id: String,
  timestamp: {
    type: Date, default: () => Date.now()
  },
}