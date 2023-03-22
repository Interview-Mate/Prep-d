const BASE_URL = "http://localhost:4000";

export const punctuate = async (text: string): Promise<any> => {
  return fetch (`${BASE_URL}/punctuate`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const createInterview = async (userna_id: string): Promise<any> => {
  return fetch (`${BASE_URL}/${userna_id}`, {
    method: "UPDATE",
    body: JSON.stringify({ userna_id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const updateAnswer = async (interview_id: string, question_text: string, answer_audio_url: string, answer_text: string, feedback: string, score: number): Promise<any> => {
  return fetch (`${BASE_URL}/${interview_id}/answer`, {
    method: "UPDATE",
    body: JSON.stringify({ interview_id, question_text, answer_audio_url, answer_text, feedback, score }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

//TODO move cloudinary upload here