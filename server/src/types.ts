export type Interview = {
  username: string;
  score: number;
  date: Date;
  cloud_url: string;
  questions: Question[] ;

};

export type Question = {
  timestamp: Date | string;
  question_text: string;
  answer_text: string;
  answer_audio_url:string;
  score: number;
}

export type Exercise = {
  //TODO

}

export interface IUser extends Document {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  level: string;
}