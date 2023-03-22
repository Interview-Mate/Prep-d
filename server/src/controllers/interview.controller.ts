import Interview from "../models/interview";
import { Request, Response } from "express";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.chatGPT_key,
});
const openai = new OpenAIApi(configuration);

exports.getInterviewsByUser = async function (req: Request, res: Response) {
  try {
    const userName = req.params.username;
    const interviews = await Interview.find({ username: userName }).sort({
      date: -1,
    }); //TODO asc/desc {date: 1}
    if (interviews.length < 1) {
      throw new Error("No previous interviews found");
    }
    res.status(200).json(interviews);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

exports.getInterview = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let result = await Interview.findById(id);
    res.json(result).status(200);
    if (!result) {
      throw new Error("Interview not found");
    }
     res
      .json(result)
      .status(200);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

exports.newInterview = async (req: Request, res: Response) => {
  try {
    let interview = await Interview.create({
      username: req.params.username,
      level: req.body.level,
      questions: [],
    });
    console.log("Interview created");
    res.status(201).json(interview);
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

function getQuestionFromChatGPT (level:String, jobType:String, questionType:String)  {
  const messages: ChatCompletionRequestMessage[] =  [
    {role: "system", content: "You are an interviewer, interviewing someone for a job at your company. It is for a senior position in the field of software development. Begin by asking an introductory question"},
    {role: "user", content: "Sure, I have been working in software development for over 10 years. I have experience in both front-end and back-end development, as well as project management."},
    {role: "assistant", content: "Can you tell me a little bit about your background and experience in software development?"},
  ]
}

// exports.addQuestionToInterview =  async (req : Request, res: Response) => {
//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: messages,
//       max_tokens: 4096,
//       temperature: 0.7,
//     });
//     return res.status(200).json(response.data);

//   } catch (error: any) {
//     if (error.response) {
//       res.status(500);
//       console.log(`error during generating response: ${error}`);
// //.....
//     }}}

exports.addQuestionToInterview =  async (req : Request, res: Response) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 4096,
      temperature: 0.7,
    });
    return res.status(200).json(response.data);

  } catch (error: any) {
    if (error.response) {
      res.status(500);
      console.log(`error during generating response: ${error}`);
//.....
    }}}


exports.addQuestionToInterview =  async (req : Request, res: Response) => {
  try {
    const interview_id = req.params.id;

    //1. initiate converstaion - role = "system"
    //2. user response - role = "user"
    const userResponce = {
      cloudinary_url: String,
      text: String,
      interview_id: String,
      timestamp: Date.now(),
    }
    //3. assistance responce
    const AssistantResponce = {
      feedback: String,
      grade: Number,
      next_question: String,
      interview_id: String,
      timestamp: Date.now(),
    }
    //loop - 7 times
    const { question_text, answer_text, answer_audio_url, score } = req.body;

    const newQuestion = {
      problem_name: String,
      solution: String,
      score: Number,
      runtime: Number,
      timestamp: Date.now(),
    };

    const interview = await Interview.findOneAndUpdate(
      { _id: interview_id },
      { $push: { questions: newQuestion } },
      { new: true }
    );

    if (!interview) {
      throw new Error("Exercise not found");

    }
    res
      .status(201)
      .json(newQuestion);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(error.message)
  }
}

exports.addExerciseToInterview =  async (req : Request, res: Response) => {

  try {
    const interview_id = req.params.id;
    const { solution, answer_text, answer_audio_url, score } = req.body;

    const newExercise = {
      solution,
      answer_text,
      answer_audio_url,
      score,
      timestamp: Date.now(),
    };

    const interview = await Interview.findOneAndUpdate(
      { _id: interview_id },
      { $push: { coding_exericses: newExercise } },
      { new: true }
    );

    if (!interview) {
      throw new Error("Exercise not found");

    }
    res
      .status(201)
      .json(newExercise);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(error.message)
  }
}