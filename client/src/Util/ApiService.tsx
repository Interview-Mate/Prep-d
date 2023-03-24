const BASE_URL = 'http://localhost:4000';

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
  }
}

export const getUser = (email: string | undefined) =>
  fetch(`${BASE_URL}/getuser/${email}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const createUser = async (newUser: User)=> {
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

export const updateUser = async (updatedUser: User)=> {
  try {
    const response = await fetch(`${BASE_URL}/user/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const getInterview = (id: string) =>
  fetch(`${BASE_URL}/interview/${id}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const getInterviews = (id: string) =>
  fetch(`${BASE_URL}/get-all-interviews/${id}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);
    
export const punctuate = async (text: string) => {
  return fetch (`${BASE_URL}punctuate`, {
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
  return fetch (`${BASE_URL}/interview/${userId}`, {
    method: "POST",
    body: JSON.stringify({ level, company, field, title }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const retrieveFirstQuestion = async ({id, role, content }:{id: string, role: string, content: string}): Promise<any> => {
  console.log("Id: ", id)
  return fetch (`${BASE_URL}/chat-response/${id}`, {
    method: "POST",
    body: JSON.stringify({ role, content}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const retrieveAnotherQuestion = async (object: object) => {
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

export const updateInterview = async (interview_id: string, answer_audio_url: string, answer_text: string): Promise<any> => {
  return fetch (`${BASE_URL}/interview/${interview_id}/questions`, {
    method: "PUT",
    body: JSON.stringify({ answer_audio_url, answer_text }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

//TODO move cloudinary upload here


export const saveSolvedProblem = async (solvedProblem: SolvedProblem) => {
  try {
    const response = await fetch(`${BASE_URL}/problem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(solvedProblem),
    });
    const savedSolvedProblem = await response.json();
    return savedSolvedProblem;
  } catch (error) {
    console.error('Error saving solved problem:', error);
  }
};


export const getSolvedProblems = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/problems/${userId}`);
    const solvedProblems = await response.json();
    return solvedProblems;
  } catch (error) {
    console.error('Error getting solved problems:', error);
  }
};

export const getAllSolvedProblems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-solved`);
    const solvedProblems = await response.json();
    return solvedProblems;
  } catch (error) {
    console.error('Error getting solved problems:', error);
  }
};

export const getProblems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-exercises`);
    const problems = await response.json();
    return problems;
  } catch (error) {
    console.error('Error getting problems:', error);
  }
}
