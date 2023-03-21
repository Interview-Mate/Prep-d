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

// function getQuestionFromChatGPT (level:String, jobType:String, questionType:String) : String {
// Calls chatGPT to get an interview question for a certain level for a certain job type
// of questionType either "Behavioural" or "Coding"
// Returns the text of the answer obtained from chatGPT
// TODO: implement
//}


exports.getQuestionFromChatGPT = async (req: Request, res: Response) => {
  
  const messages: ChatCompletionRequestMessage[] =  [
    {role: "system", content: "You are an interviewer, interviewing someone for a job at your company. It is for a senior position in the field of software development. Begin by asking an introductory question"},
    {role: "user", content: "Sure, I have been working in software development for over 10 years. I have experience in both front-end and back-end development, as well as project management."},
    {role: "assistant", content: "Can you tell me a little bit about your background and experience in software development?"},
  ]

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 4096,
      temperature: 0.7,
    });
    return res.status(200).json({
      data: response.data.choices[0].message
    });
    
  } catch (error: any) {
    if (error.response) {
      res.status(500);
      console.log(`error during generating response: ${error}`);
    }
  }
  
  //   // throw Error("Function not implemented")
};

exports.addQuestionToInterview = async (req: Request, res: Response) => {
  //TODO: clarify if chatGPT calls are going to be made client side or
  // server side -  API design will change accordingly
  // ATM this function might not be useful (but works :) )
  try {
    const interview_id = req.params.id;
    const { question_text, answer_text, answer_audio_url, score } = req.body;

    const newQuestion = {
      question_text,
      answer_text,
      answer_audio_url,
      score,
      timestamp: Date.now(),
    };

    const interview = await Interview.findOneAndUpdate(
      { _id: interview_id },
      { $push: { questions: newQuestion } },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    return res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
