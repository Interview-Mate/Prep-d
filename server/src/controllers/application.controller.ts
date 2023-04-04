import { config } from "dotenv";
config();

import { Request, Response } from "express";


import pdf from "../libs/pdf-parse/index.js";

// import pdf from "pdf-parse";

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.chatGPT_key,
  })
);

const createCoverLetter = async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a cover letter based on following information: Position: ${req.body.position}, job title: ${req.body.jobTitle}, company: ${req.body.company}, start date: ${req.body.startDate}(write the date in a more appropriate way), description: ${req.body.description}. My work experience is: ${req.body.workExperience}, my qualifications: ${req.body.qualification}. Include following keywords at appropriate points: ${req.body.selectedKeywords}. Address the hiring manager with: Dear hiring manager. Close the letter with following name: ${req.body.firstName} ${req.body.lastName}.`,
      temperature: 1,
      max_tokens: 350,
    });

    // const text = response.data.choices[0].text?.replace(/\b(\w+)\s+regards\b/i, '$1').replace(/(best regards|kind regards|sincerely|regards|[Your Name]|your name)\s*,/gi, '').replace(/\[.*?\]/g, '');
    res.status(201).json(response.data.choices[0].text);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

const createResume = async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a resume based on following information: Position: ${req.body.position}, job title: ${req.body.jobTitle}, company: ${req.body.company}, start date: ${req.body.startDate}(write the date in a more appropriate way), description: ${req.body.description}. My work experience is: ${req.body.workExperience}, my qualifications: ${req.body.qualification}. Include following keywords at appropriate points: ${req.body.selectedKeywords}. Address the hiring manager as such. Close the letter with following name: ${req.body.firstName} ${req.body.lastName}.`,
      temperature: 1,
      max_tokens: 350,
    });
    res.status(201).json(response.data.choices[0].text);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

const getPdfReview = async (req: Request | any, res: Response) => {
  try {
    let data = await pdf(req.files.file.data)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Review my cover letter: ${data.text}.Rate on a 0-5 scale. Write a text about the quality of the cover letter. Give examples what to improve. The format shoud be: 'Rating: number. Review: review text. Improvement: improvements.'`,
      temperature: 1,
      max_tokens: 350,
    });
    res
      .status(201)
      .json({ response: response.data.choices[0].text, text: data.text });
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

const getTextReview = async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Review my cover letter: ${req.body.text}.Rate on a 0-5 scale. Write a text about the quality of the cover letter. Give examples what to improve. The format shoud be: 'Rating: number. Review: review text. Improvement: improvements.'`,
      temperature: 1,
      max_tokens: 350,
    });
    res
      .status(201)
      .json({ response: response.data.choices[0].text, text: req.body.text });
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

const improveCoverLetter = async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Improve my cover letter. No comments, only the content, but make it a complete cover letter, including greeting at the start: ${JSON.stringify(
        req.body.text
      )}.{end}`,
      temperature: 1,
      max_tokens: 350,
      stop: ["{end}"],
    });
    res.status(201).json(response.data.choices[0].text);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

export {
  createCoverLetter,
  createResume,
  getPdfReview,
  getTextReview,
  improveCoverLetter,
};
