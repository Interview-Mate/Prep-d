import { mongoose } from './index.models';

const interviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
    company: String,
    field: String,
    title: String,
  date: {
    type: Date, default: () => Date.now()
   },

  conversation: [{
      role: String,
      cloudinary_url: String,
      content: String,
    },
  ],
    overall: [],
  });


const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
