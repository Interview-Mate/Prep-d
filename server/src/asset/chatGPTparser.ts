function parseMessage (str: any) {
  try {
    const jsonStart = str.indexOf("{");
    const jsonEnd = str.lastIndexOf("}") + 1;
    const jsonString = str.slice(jsonStart, jsonEnd);
    const content = JSON.parse(jsonString);
    if (
      !content.rating_feedback ||
      !content.rating_number ||
      !content.next_question
    ) {
      throw new Error("Invalid object: required properties missing.");
    }
    const contentObj = {
      feedback: content.rating_feedback,
      rating: parseFloat(content.rating_number),
      nextQuestion: content.next_question,
    };
    return contentObj;
  } catch (err: any) {
    const contentObj = {
      feedback: str,
      rating: 0,
      nextQuestion:
        "Sorry, I didnt understand that. Could you please rephrase your answer?",
    };
    return contentObj;
  }
}

export default parseMessage;

