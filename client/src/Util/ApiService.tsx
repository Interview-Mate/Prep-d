export const saveSolution = async (solution: Solution) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/problem`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),
      }
    );
    const savedSolution = await response.json();
    return savedSolution;
  } catch (error) {
    console.error('Error saving solution:', error);
  }
};

export const getSolutions = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/problems/:${userId}}`
    );
    const solutions = await response.json();
    return solutions;
  } catch (error) {
    console.error('Error getting solutions:', error);
  }
}
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

export const getProblems = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/problems`
    );
    const problems = await response.json();
    return problems;
  } catch (error) {
    console.error('Error getting problems:', error);
  }
}