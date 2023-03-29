const BASE_URL = "http://localhost:4000";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
  }
};

export const getUser = async (email: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/getuser/${email}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
  }
};

export const createUser = async (newUser: User) => {
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

export const updateUser = async (updatedUser: User) => {
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

// export const getInterview = (id: string) =>
//   fetch(`${BASE_URL}/interview/${id}`)
//     .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
//     .then((res) => res.json())
//     .catch((err) => err);

// export const getInterviews = (id: string) =>
//   fetch(`${BASE_URL}/get-all-interviews/${id}`)
//     .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
//     .then((res) => res.json())
//     .catch((err) => err);

export const getInterview = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/interview/${id}`);
    const interview = await response.json();
    return interview;
  } catch (error) {
    console.error("Error getting interview:", error);
  }
};

export const getInterviews = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-interviews/${id}`);
    const interviews = await response.json();
    return interviews;
  } catch (error) {
    console.error("Error getting interviews:", error);
  }
};

export const punctuate = async (text: string) => {
  return fetch(`${BASE_URL}/punctuate`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const createInterview = async (
  userId: string,
  level: string,
  company: string,
  field: string,
  title: string
): Promise<any> => {
  return fetch(`${BASE_URL}/interview/${userId}`, {
    method: "POST",
    body: JSON.stringify({ level, company, field, title }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const retrieveQuestion = async ({
  id,
  role,
  content,
}: {
  id: string;
  role: string;
  content: string;
}): Promise<any> => {
  console.log("Id: ", id);
  return fetch(`${BASE_URL}/chat-response/${id}`, {
    method: "POST",
    body: JSON.stringify({ role, content }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const retrieveAnotherQuestion = async (object: object) => {
  return fetch(`${BASE_URL}/chat-response`, {
    method: "POST",
    body: JSON.stringify({ object }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateInterview = async (
  interview_id: string,
  answer_audio_url: string,
  answer_text: string,
  question_count: number
): Promise<any> => {
  return fetch(`${BASE_URL}/interview/${interview_id}/questions`, {
    method: "PUT",
    body: JSON.stringify({ answer_audio_url, answer_text, question_count }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const endInterview = async (interview_id: string): Promise<any> => {
  return fetch(`${BASE_URL}/interview-rating/${interview_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const postAudio = async (formData: any): Promise<any> => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error) {
    console.log("Error submitting to Cloudinary", error);
  }
};

export const saveSolvedProblem = async (solvedProblem: SolvedProblem) => {
  try {
    const response = await fetch(`${BASE_URL}/problem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solvedProblem),
    });
    const savedSolvedProblem = await response.json();
    return savedSolvedProblem;
  } catch (error) {
    console.error("Error saving solved problem:", error);
  }
};

export const getSolvedProblems = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/problems/${userId}`);
    const solvedProblems = await response.json();
    return solvedProblems;
  } catch (error) {
    console.error("Error getting solved problems:", error);
  }
};

export const getAllSolvedProblems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-solved`);
    const solvedProblems = await response.json();
    return solvedProblems;
  } catch (error) {
    console.error("Error getting solved problems:", error);
  }
};

export const getProblems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-all-exercises`);
    const problems = await response.json();
    return problems;
  } catch (error) {
    console.error("Error getting problems:", error);
  }
};

export const createCoverLetter = async (coverLetterRequest: any) => {
  try {
    const response = await fetch(`${BASE_URL}/create-cover-letter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coverLetterRequest),
    });
    const receivedCoverLetter = await response.json();
    return receivedCoverLetter;
  } catch (error) {
    console.error("Error creating cover letter:", error);
  }
};

export const createResume = async (resumeRequest: any) => {
  try {
    const response = await fetch(`${BASE_URL}/create-resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resumeRequest),
    });
    const receivedResume = await response.json();
    return receivedResume;
  } catch (error) {
    console.error("Error creating resume:", error);
  }
};

export const reviewPdfCoverLetter = async (pdf: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/get-pdf-review`, {
      method: "POST",
      body: pdf,
    });
    const review = await response.json();
    return review;
  }
  catch (error) {
    console.error("Error reviewing cover letter:", error);
  }
};

export const reviewTextCoverLetter = async (coverLetterRequest: string) => {
  try {
    const response = await fetch(`${BASE_URL}/get-text-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: coverLetterRequest}),
    }
    );
    const review = await response.json();
    return review;
  } catch (error) {
    console.error("Error reviewing cover letter:", error);
  }
}

export const improveCoverLetter = async (coverLetterRequest: string) => {
  try {
    const response = await fetch(`${BASE_URL}/improve-cover-letter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: coverLetterRequest}),
    });
    const receivedCoverLetter = await response.json();
    console.log(receivedCoverLetter);
    return receivedCoverLetter;
  } catch (error) {
    console.error("Error improving cover letter:", error);
  }
}