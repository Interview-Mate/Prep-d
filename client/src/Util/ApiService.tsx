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
