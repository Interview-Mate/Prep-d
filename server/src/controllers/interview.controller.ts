import Interview from "../models/interview";
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { ChatCompletionRequestMessage } from "openai";
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

function getQuestionFromChatGPT (level:String, jobType:String, questionType:String) : String {
  // Calls chatGPT to get an interview question for a certain level for a certain job type
  // of questionType either "Behavioural" or "Coding"
  // Returns the text of the answer obtained from chatGPT
  // TODO: implement
  throw Error('Function not implemented')
}


exports.addQuestionToInterview =  async (req : Request, res: Response) => {
  try {
    const interview_id = req.params.id;
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