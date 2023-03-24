function parseMessage (str: string) {
  const jsonStart = str.indexOf("{");
  const jsonEnd = str.lastIndexOf("}") + 1;
  const jsonString = str.slice(jsonStart, jsonEnd);
  
  const content = JSON.parse(jsonString);

  let contentObj = {
    feedback: content.rating_feedback,
    rating: parseFloat(content.rating_number),
    nextQuestion: content.next_question
  };
  return contentObj;
}

export default parseMessage;


