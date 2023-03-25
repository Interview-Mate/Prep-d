import { mongoose } from './index.models';

const coverLetterSchema = new mongoose.Schema({
  text: String,
});

const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);
export default CoverLetter;
