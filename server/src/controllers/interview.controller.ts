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
// throw Error('Function not implemented')
// }

exports.getQuestionFromChatGPT = async (req: Request, res: Response) => {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are an interviewer, interviewing someone for a job at your company. It is for a senior position in the field of software development. Begin by asking an introductory question. After you receive a response from the user, continue asking questions in the style of an interview. If a response requires a follow up, then you can ask a follow up question. However, after two or three follow up questions, go back to asking another original question, in the normal style of an interview.",
    },
    {
      role: "assistant",
      content:
        "Can you tell us about your background and experience in software development?",
    },
    {
      role: "user",
      content:
        "I've been working in the software development industry for the past 8 years, primarily as a full-stack developer. I hold a Bachelor's degree in Computer Science, which gave me a solid foundation in computer programming, algorithms, and data structures. I started my career as an intern at a software development firm where I was introduced to various software development methodologies such as Agile and Scrum. Since then, I've worked for both startups and large corporations, gaining experience in developing web applications, mobile applications, and enterprise-level software systems. My technical skills include proficiency in programming languages such as JavaScript, Python, and Java, as well as a strong understanding of various front-end frameworks such as React and Angular. I also have experience working with various back-end frameworks such as Node.js, Flask, and Spring Boot. In my previous role as a senior software developer, I worked on complex software systems, collaborating with cross-functional teams to design, develop, and deploy robust solutions that met the needs of our clients. I have experience in developing scalable and fault-tolerant applications, as well as building APIs and microservices using various cloud platforms such as AWS, Azure, and Google Cloud Platform. In summary, I am a highly motivated and experienced software developer with a strong foundation in computer science principles and a passion for building scalable and robust software systems. Rate my response out of 5 with a comment and return this as a JSON object. Then on a new line continue to the next question.",
    },
  ];

  // try {
  //   let answerText: any;
  //   const interview = await Interview.findOne({ userna_id: req.params.id })
  //   if (!interview) {
  //     return res.status(404).json({ error: 'Interview not found' });
  //   }
  //   answerText = interview.questions[0].answer_text;
  //   messages.push({ role: "user", content: answerText });
  // } catch (error: any) {
  //   console.error(error);
  //   res
  //     .status(500)
  //     .json(error.message)
  // }

  try {
    console.log(messages);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 2000,
      temperature: 0.7,
    });
    if (
      response.data.choices &&
      response.data.choices.length > 0 &&
      response.data.choices[0].message &&
      response.data.choices[0].message.content
    ) {
      const messageContent = response.data.choices[0].message.content;
      const lines = messageContent.split("\n");
      if (lines.length > 0) {
        console.log(lines[lines.length - 1].trim());
      }
      return res.status(200).json(response.data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

exports.addQuestionToInterview = async (req: Request, res: Response) => {
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
    res.status(201).json(newQuestion);
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

exports.addExerciseToInterview = async (req: Request, res: Response) => {
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
    res.status(201).json(newExercise);
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
