import { config } from "dotenv";
config();

import Interview from "../models/interview";
import { Request, Response } from "express";
import parseMessage from "./../asset/chatGPTparser";
import { Configuration, OpenAIApi } from "openai";
import { QorA } from "../types";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.chatGPT_key,
  })
);

const getInterviewsByUser = async (req: Request, res: Response) => {
  try {
    if (req.params.userId.length !== 24) {
      throw new Error ("The user ID is either missing or invalid.");
    }
    const userId = req.params.userId;
    const interviews = await Interview.find({ user_id: userId }).sort({
      date: -1,
    });
    if (interviews.length < 1) {
      throw new Error("No previous interviews found");
    }
    res.status(200).json(interviews);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

const getInterviewByInterviewId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Interview.findById(id);
    if (!result) {
      throw new Error("Interview not found");
    }
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//! FE => createInterview - url/:userID => (userId, level, company, field, title)
//? BE => router.post("/interview/:userId", interviewCont.newInterview);
const newInterview = async (req: Request, res: Response) => {

  try {
    if (req.params.userId.length !== 24) {
      throw new Error ("The user ID is either missing or invalid.");
    }
    const interview = await Interview.create({
      user_id: req.params.userId,
      level: req.body.level,
      company: req.body.company,
      field: req.body.field,
      title: req.body.title,
      conversation: [],
    });
    res.status(201).json(interview);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//! FE => retrieveAnotherQuestion - url/chat-response => (object)
//? BE => router.post('/chat-response/:id', interviewCont.getQuestionFromChatGPT)
//sends system prompt to chatGPT => returnts first question from chatGPT
const getQuestionFromChatGPT = async (req: Request, res: Response) => {
  try {
    const interview_id = req.params.id;
    const newInteraction = {
      role: req.body.role,
      content: req.body.content,
    };

    const interview = await Interview.findOneAndUpdate(
      { _id: interview_id },
      { $push: { conversation: newInteraction } },
      { new: true }
    );
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      //@ts-ignore
      messages: interview.conversation.map((x: QorA) => {
        return { role: x.role, content: x.content };
      }),
      temperature: 0.5,
    });

    let updatedConversation;

    if (response.data.choices && response.data.choices[0].message) {
      const message = response.data.choices[0].message;

      updatedConversation = await Interview.findOneAndUpdate(
        { _id: interview_id },
        { $push: { conversation: message } },
        { new: true }
      );
    }
    if (!interview) {
      throw new Error("Interview not found");
    }
    res
      .status(201)
      //@ts-ignore
      .json(updatedConversation?.conversation[1].content);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

function addHintForChatGPT (inp: any, question_count: number) {
  let suffix: string;
  if (question_count < 8) {
    suffix = ` Rate my response out of 5 with a comment. Then continue to the next question. Return this as a JSON object without plus signs in this format:
  {rating_number: input the rating you gave me as a number,
    rating_feedback: the feedback you gave me to the previous question,
    next_question: your next question}.`;

    return inp.concat(suffix);
  } else {
    suffix = ` Rate my response out of 5 with a comment. Then conclude the interview with a statement. Return this as a JSON object without plus signs in this format:
  {rating_number: input the rating you gave me as a number,
    rating_feedback: the feedback you gave me to the previous question,
    next_question: instead of a question, provide your conclusion}.`;

    return inp.concat(suffix);
  }
}

//! FE => updateInterview - url/:interview_id/answer` => (interview_id, question_text, answer_audio_url, answer_text, feedback, score)
//? BE => router.put("/interview/:id/questions", interviewCont.addAnswerToInterview);
//(adds user answer to DB => returnts next question from chatGPT) x 7 times || question_count
const addAnswerToInterview = async (req: Request, res: Response) => {
  try {
    const interview_id = req.params.id;
    const { answer_text, answer_audio_url, question_count } = req.body;

    const newInteraction = {
      role: "user",
      cloudinary_url: answer_audio_url,
      content: answer_text,
    };

    const interview = await Interview.findOneAndUpdate(
      { _id: interview_id },
      { $push: { conversation: newInteraction } },
      { new: true }
    );

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      //@ts-ignore
      messages: interview?.conversation.map((x) => {
        return {
          role: x.role,
          content: x.role == "user" ? addHintForChatGPT(x.content, question_count) : x.content };
      }),
      temperature: 0.5,
    });

    let updatedConversation;
    if (response.data.choices && response.data.choices[0].message) {
      const message = response.data.choices[0].message;

      updatedConversation = await Interview.findOneAndUpdate(
        { _id: interview_id },
        { $push: { conversation: message } },
        { new: true }
      );
    }

    const followingQuestion = parseMessage(
      updatedConversation?.conversation[
        updatedConversation.conversation.length - 1
      ].content
    ).nextQuestion;

    if (!interview) {
      throw new Error("Interview not found");
    }
    res.status(201).json(followingQuestion);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};


function checkRoleAndParseMessage (objInConversation: any) {
  if (objInConversation.role === "user") {
    return {
      interviewee: objInConversation.content,
    };
  }
  if (objInConversation.role === "assistant") {
    let out;
    try {
      out = JSON.parse(objInConversation.content).next_question;
    } catch {
      out = objInConversation.content;
    }
    return {
      interviewer: out,
    };
  }
  if (!objInConversation.role) {
    throw new Error(
      `Message ${objInConversation} is missing the 'role ' property`
    );
  }
}

//? BE: router.post("/interview-rating/:id", interviewCont.getInterviewRating);
//sends the entire converstion to chat gpt and returns overall feedback and rating
const getInterviewRating = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Interview.findById(id);
    if (!result) {
      throw new Error("Interview not found");
    }
    result.conversation.shift();


    const entireConversation: Array<any> = result.conversation.map((x) =>
      checkRoleAndParseMessage(x)
    );
    // @ts-ignore
    let jsons = entireConversation.map((x) => JSON.stringify(x));

    const askForFeedback = `You are an interviewer, who just interviewed someone for a job at ${
      result.company || "a certain company"
    }. It is for a ${result.title || "mid level"} position in the field of ${
      result.field || "software development"
    }. Provide a rating out of 5 for the candidate's responses and give a general feedback on the interview, including suggestions on how the candidate could improve their performance in future.
    Return this as a JSON object (without any '+' sign), in the following format:
      {overall_number: input the rating you gave to the interview as a number,
        overall_feedback: the feedback you gave to the interview,
        suggestions: how could the candidate improve
      }.
      The interview, as an array of JSONS, went like this: ${jsons}
    `;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: askForFeedback }],
      temperature: 0.5,
    });

    let finalFeedback;
    if (response.data.choices && response.data.choices[0].message) {
      const message = response.data.choices[0].message.content;

      finalFeedback = await Interview.findOneAndUpdate(
        { _id: id },
        { $push: { overall: message } },
        { new: true }
      );
    }

    res.status(200).json(response.data.choices[0].message?.content);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export {getInterviewsByUser, getInterviewByInterviewId, newInterview, addAnswerToInterview , getQuestionFromChatGPT, getInterviewRating};
