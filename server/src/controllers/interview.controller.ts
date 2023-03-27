//@ts-nocheck
import Interview from "../models/interview";
import { Request, Response } from "express";
import parseMessage from "./../asset/chatGPTparser";
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.chatGPT_key,
  })
);

const getInterviewsByUser = async function (req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const interviews = await Interview.find({ user_id: userId }).sort({
      date: -1,
    });
    if (interviews.length < 1) {
      throw new Error('No previous interviews found');
    }
    res.status(200).json(interviews);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

const getInterviewByInterviewId = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let result = await Interview.findById(id);
    if (!result) {
      throw new Error('Interview not found');
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
    let interview = await Interview.create({
      user_id: req.params.userId,
      level: req.body.level,
      company: req.body.company,
      field: req.body.field,
      title: req.body.title,
      conversation: [],
    });
    console.log("Interview created");
    res.status(201).json(interview);
  } catch (err: any) {
    console.log(err);
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
      messages: interview.conversation.map((x) => {
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
    console.log(interview);
    if (!interview) {
      throw new Error("Interview not found");
    }
    res
      .status(201)
      //@ts-ignore
      .json(updatedConversation?.conversation[1].content);
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

function addHintForChatGPT(inp: String) {
  let suffix = ` Rate my response out of 5 with a comment. Then continue to the next question. Return this as a JSON object without plus signs in this format:
  {rating_number: input the rating you gave me as a number,
    rating_feedback: the feedback you gave me to the previous question,
    next_question: your next question}.`;
  return inp.concat(suffix);
}

    //! FE => updateInterview - url/:interview_id/answer` => (interview_id, question_text, answer_audio_url, answer_text, feedback, score)
    //? FE => router.put("/interview/:id/questions", interviewCont.addAnswerToInterview);
    //adds user answer to DB => returnts next question from chatGPT
const addAnswerToInterview = async (req: Request, res: Response) => {
      try {
        const interview_id = req.params.id;
        const { answer_text, answer_audio_url } = req.body;
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
      messages: interview.conversation.map((x) => {
        return {
          role: x.role,
          content: x.role == "user" ? addHintForChatGPT(x.content) : x.content,
        };
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

    let followingQuestion = parseMessage(
      updatedConversation?.conversation[
        updatedConversation.conversation.length - 1
      ].content
    ).nextQuestion;

    if (
      followingQuestion.toLowerCase().includes("error") ||
      followingQuestion.toLowerCase().includes("json")
    ) {
      followingQuestion =
        "Sorry, I didn't understand that. Could you please rephrase your answer?";
    }

    if (!interview) {
      throw new Error("Interview not found");
    }
    res.status(201).json(followingQuestion);
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

function checkContent(objInConversation) {
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
      `Message ${objInConversation} is missing the \'role \' property`
    );
  }
}

const getInterviewRating = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let result = await Interview.findById(id);
    if (!result) {
      throw new Error("Interview not found");
    }
    result.conversation.shift();
    console.log(result.conversation);

    let entireConversation: any = result.conversation.map((x) =>
      checkContent(x)
    );

    let jsons = entireConversation.map((x) => JSON.stringify(x));

    let askForFeedback = `You are an interviewer, who just interviewed someone for a job at ${
      result.company || "a certain company"
    }. It is for a ${result.title || "mid level"} position in the field of ${
      result.field || "software development"
    }. Provide a rating out of 5 for the candidate's responses and give a general feedback on the interview, including suggestions on how the candidate could improve their performance in future.
    Return this as a JSON object (without any '+' sign), in the following format: {overall_number: input the rating you gave to the interview as a number, overall_feedback: the feedback you gave to the interview,
      suggestions: how could the candidate improve  }.
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

    // console.log(finalFeedback)
    res.status(200).json(response.data.choices[0].message?.content);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export {getInterviewsByUser, getInterviewByInterviewId, newInterview, addAnswerToInterview , getQuestionFromChatGPT, getInterviewRating};