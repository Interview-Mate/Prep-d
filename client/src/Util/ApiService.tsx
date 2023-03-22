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