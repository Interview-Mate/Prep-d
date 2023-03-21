const BASE_URL = "http://localhost:4000";

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
