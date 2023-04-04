export type Interview  = {
  user_id: string;
  company: string;
  field: string;
  title: string,
  date: Date;
  conversation: QorA[];
  overall: string[] ;
};

export type QorA = {
  role: string,
  cloudinary_url ?: string,
  content: string,
}

export type Question = {
  timestamp: Date | string;
  question_text: string;
  answer_text: string;
  answer_audio_url:string;
  score: number;
}

export type Exercise = {
  name: string;
  description: string;
  hint: string;
  function: string;
  solution1: string[];
  solution2: string[];
  solution3: string[];
  language: string;
  level: number;

}
export type SolvedProblemT = {
  user_id: string;
  problem_id: string;
  solution: string;
  score: number;
  runtime: number;
  solveTime: number;
}

export interface IUser {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  level: number;
}

