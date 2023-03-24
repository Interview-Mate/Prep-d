import Interview from "../models/interview";
import { Request, Response, response } from "express";
import parseMessage from "./../asset/chatGPTparser"
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import {config} from "dotenv"
config();


const openai = new OpenAIApi( new Configuration({
  apiKey: process.env.chatGPT_key,
}));

exports.getInterviewsByUser = async function (req: Request, res: Response) {
  try {
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

exports.getInterview = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let result = await Interview.findById(id);
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
exports.newInterview = async (req: Request, res: Response) => {
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
exports.getQuestionFromChatGPT = async (req: Request, res: Response) => {
  try {
    const interview_id = req.params.id;
    //const newInteraction = req.body;
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
        messages: (interview.conversation.map(x => {
          return { role: x.role, content: x.content}
        }
        )),
        temperature: 0.5,
      })

      let updatedConversation ;

      if (response.data.choices && response.data.choices[0].message ){
        const message = response.data.choices[0].message;

        updatedConversation =  await Interview.findOneAndUpdate(
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
        console.error(error);
        res
        .status(500)
        .json(error.message);
      }
    };

    //! FE => updateInterview - url/:interview_id/answer` => (interview_id, question_text, answer_audio_url, answer_text, feedback, score)
    //? FE => router.put("/interview/:id/questions", interviewCont.addAnswerToInterview);
    //adds user answer to DB => returnts next question from chatGPT
    exports.addAnswerToInterview = async (req: Request, res: Response) => {
      try {
        const interview_id = req.params.id;
        const { answer_text, answer_audio_url } = req.body;
        const userAnswer = answer_text.concat(' Rate my response out of 5 with a comment. Then continue to the next question. return this as a JSON object without plus signs in this format {rating_number: input the rating you gave me as a number , rating_feedback:  the feedback you gave me to the previous question ,next_question: your next question}.')
        const newInteraction = {
          role: "user",
          cloudinary_url: answer_audio_url,
          content: userAnswer,
        };

        const interview = await Interview.findOneAndUpdate(
          { _id: interview_id },
          { $push: { conversation: newInteraction } },
          { new: true }
          );

          const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            //@ts-ignore
            messages: (interview.conversation.map(x => {
              return { role: x.role, content: x.content}
            }
            )),
            temperature: 0.5,
          })
          let updatedConversation ;
          if (response.data.choices && response.data.choices[0].message ){

            const message = response.data.choices[0].message;

            updatedConversation =  await Interview.findOneAndUpdate(
              { _id: interview_id },
              { $push: { conversation: message } },
              { new: true }
              );
            }
              //@ts-ignore
            let followingQuestion = (parseMessage(updatedConversation?.conversation[updatedConversation.conversation.length - 1].content).nextQuestion)

            if (!interview) {
              throw new Error("Interview not found");
            }
            res
            .status(201)
            .json(followingQuestion);
          } catch (error: any) {
            console.error(error);
            res
            .status(500)
            .json(error.message);
          }
        };


// exports.getInterviewRating = async (req: Request, res: Response) => {
//   try {
//     let id = req.params.id;
//     let result = await Interview.findById(id);
//       if (!result) {
//         throw new Error("Interview not found");
//       }
//         //@ts-ignore
//         let grades : any = result.conversation
//         //@ts-ignore
//         .map(x => parseMessage(x.content).rating ?? 0)
//         .filter (x => x !== 0 )
//       let len = grades.length

//       let average = grades.reduce((acc: Number, curr: any): Number => (acc + curr)) / grades.length
//     res
//       .status(200)
//       .json(average);
//   } catch (err: any) {
//     res
//       .status(500)
//       .json(err.message);
//   }
// };