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

const createCoverLetter = async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Create a cover letter based on following information: Position: ${req.body.position}, job title: ${req.body.jobTitle}, company: ${req.body.company}, start date: ${req.body.startDate}(write the date in a more appropriate way), description: ${req.body.description}. My work experience is: ${req.body.workExperience}, my qualifications: ${req.body.qualification}. Include following keywords at appropriate points: ${req.body.keywords}. Address the hiring manager as such. Close the letter with following name: ${req.body.firstName} ${req.body.lastName}.`,
      temperature: 1,
      max_tokens: 350,
    });
   
    // const text = response.data.choices[0].text?.replace(/\b(\w+)\s+regards\b/i, '$1').replace(/(best regards|kind regards|sincerely|regards|[Your Name]|your name)\s*,/gi, '').replace(/\[.*?\]/g, '');
    res.status(201).json(response.data.choices[0].text);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

export {createCoverLetter };