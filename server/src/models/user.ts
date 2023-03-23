import { mongoose } from "./index.models";

// levels = {
//   1: 'Beginner',
//   2: 'Intermediate',
//   3: 'Advanced',
//   4: 'Expert',
// };

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
