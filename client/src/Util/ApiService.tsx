const BASE_URL = "http://localhost:4000";

export const getUser = (email: string | undefined): Promise<any> =>
  fetch(`${BASE_URL}/getuser/${email}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const createUser = async (newUser: User): Promise<any> => {
  console.log(newUser);
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getInterview = (id: string): Promise<any[]> =>
  fetch(`${BASE_URL}/interview/${id}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const getInterviews = (id: string) =>
  fetch(`${BASE_URL}/get-all-interviews/${id}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);
    
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

export const createInterview = async (userId: string, level: string, company: string, field: string, title: string): Promise<any> => {
  return fetch (`${BASE_URL}/${userId}`, {
    method: "POST",
    body: JSON.stringify({ level, company, field, title }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const retrieveFirstQuestion = async (object: object): Promise<any> => {
  return fetch (`${BASE_URL}/chat-response`, {
    method: "POST",
    body: JSON.stringify({ object }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const retrieveAnotherQuestion = async (object: object): Promise<any> => {
  return fetch (`${BASE_URL}/chat-response`, {
    method: "POST",
    body: JSON.stringify({ object }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const updateInterview = async (interview_id: string, question_text: string, answer_audio_url: string, answer_text: string, feedback: string, score: number): Promise<any> => {
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