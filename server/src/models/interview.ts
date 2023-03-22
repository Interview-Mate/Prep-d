import { mongoose } from './index.models';


const interviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date, default: () => Date.now()
   },

  assistant: [
      {
        timestamp: {
          type: Date, default: () => Date.now()
        },
        feedback: String,
        grade: Number,
        next_question: String,
        interview_id: String,
      },
    ],

  user: [
    {
      timestamp: {
        type: Date, default: () => Date.now()
      },
      cloudinary_url: String,
      text: String,
      interview_id: String,
    },
  ],

  overall_score: Number,

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