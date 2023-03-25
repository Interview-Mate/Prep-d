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
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Create the text body of a cover letter based on following information, address the hiring manager as such, and exclude any closing at the end of the letter: ${JSON.stringify(
        req.body
      )}`,
      temperature: 1,
      max_tokens: 350,
    });
   
    const text = response.data.choices[0].text?.replace(/\b(\w+)\s+regards\b/i, '$1').replace(/(best regards|kind regards|sincerely|regards|[Your Name]|your name)\s*,/gi, '').replace(/\[.*?\]/g, '');
    res.status(201).json(text);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};
