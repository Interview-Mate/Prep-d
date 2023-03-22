const BASE_URL = "http://localhost:4000";

export const getUser = (email: string | undefined): Promise<any> =>
  fetch(`${BASE_URL}/getuser/${email}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const createUser = async (newUser: User): Promise<any> => {
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
