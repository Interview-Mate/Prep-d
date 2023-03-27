 export type Interview  = {
  user_id: string;
  company: string;
  field: string;
  title: string,
  date: Date;
  conversation: any [];
  cloudinary_url: string;
  overall: any[] ;
};

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
  solution1: any[];
  solution2: any[];
  solution3: any[];
  language: string;
  level: number;

}
export type SolvedProblem = {
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

export type UserResponse = {
  cloudinary_url: string,
  text: string,
  interview_id: string
}

export type AssistantResponse = {
  feedback: string,
  grade: number,
  next_question: string,
  interview_id: string
}