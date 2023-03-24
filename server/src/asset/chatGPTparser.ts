
function parseMessage (str: string) {
  // str = str.replace('\\n', '');
  const jsonStart = str.indexOf("{");
  const jsonEnd = str.lastIndexOf("}") + 1;
  const jsonString = str.slice(jsonStart, jsonEnd);
  const followUpStart = jsonEnd + 1;
  //const followUp = str.substring(followUpStart).trim();

  const content = JSON.parse(jsonString);

  let contentObj = {
    feedback: content.rating_feedback,
    rating: parseFloat(content.rating_number),
    nextQuestion: content.next_question
  };
  return contentObj;
}

export default parseMessage;

// const contentString = "{\n  \"rating_number\": 5,\n  \"rating_feedback\": \"Your experience and technical skills are impressive, and it's great to see that you have worked on complex software systems. Your understanding of various front-end and back-end frameworks is also impressive. Overall, a very strong introduction!\",\n  \"next_question\": \"Can you tell me about a particularly challenging project you worked on and how you approached it?\" \n}";

// const str1 = "{\n  \"rating_number\": 5,\n  \"rating_feedback\": \"That's a great example of a challenging project you worked on in the past. Your ability to collaborate with the client, conduct research, and use agile development methodologies to overcome obstacles is impressive. It's clear that you have a strong understanding of software development principles and practices. \",\n  \"next_question\": \"How do you stay up-to-date with the latest developments in the software development industry, and what new technologies are you currently interested in learning more about?\" \n}"

// console.log(parseMessage(contentString));

// {
//   feedback: "Your experience and technical skills are impressive, and it's great to see that you have worked on complex software systems. Your understanding of various front-end and back-end frameworks is also impressive. Overall, a very strong introduction!",
//   rating: 5,
//   nextQuestion: 'Can you tell me about a particularly challenging project you worked on and how you approached it?'
// }
