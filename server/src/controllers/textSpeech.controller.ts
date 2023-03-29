import { config } from 'dotenv';
config();

import textToSpeech from "@google-cloud/text-to-speech";
import axios from "axios";
import { Request, Response } from "express";
import FormData from "form-data";


interface TextToSpeechRequestBody {
  text: string;
}

interface TextToSpeechResponseBody {
  audioContent: string;
}

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "./auth.json",
});

const speechMe = async (req: Request, res: Response) => {
  const { text } = req.body as TextToSpeechRequestBody;
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" as const },
    audioConfig: { audioEncoding: "MP3" as const },
  };

  const [response] = await client.synthesizeSpeech(request);
  console.log(response)
  res.status(200).send(response);
};

export {speechMe}