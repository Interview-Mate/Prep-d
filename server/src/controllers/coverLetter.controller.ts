import CoverLetter from '../models/coverLetter';
import { Request, Response } from 'express';

import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.chatGPT_key,
  })
);

exports.createCoverLetter = async (req: Request, res: Response) => {
  try {
    // const coverLetter = await CoverLetter.create(req.body);
    // const prompt = {
    //   role: req.body,
    //   content: req.body.content,
    // };
    console.log(
      `Create a cover letter me based following information: ${JSON.stringify(
        req.body
      )}`
    );
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Create a cover letter me based following information: ${JSON.stringify(
        req.body
      )}`,
      temperature: 0.9,
      max_tokens: 200,
    });
    console.log(response.data.choices[0].text);
    res.status(201).json(response.data.choices[0].text);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};