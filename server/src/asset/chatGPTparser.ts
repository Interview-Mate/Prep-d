function parseMessage(str: any) {
  try {
    const jsonStart = str.indexOf('{');
    const jsonEnd = str.lastIndexOf('}') + 1;
    const jsonString = str.slice(jsonStart, jsonEnd);
    const content = JSON.parse(jsonString);
    if (
      !content.rating_feedback ||
      !content.rating_number ||
      !content.next_question
    ) {
      throw new Error(`Invalid object: required properties missing.`);
    }
    let contentObj = {
      feedback: content.rating_feedback,
      rating: parseFloat(content.rating_number),
      nextQuestion: content.next_question,
    };
    return contentObj;
  } catch (err: any) {
    console.log('Parser error:', err.message);
    let contentObj = {
      feedback: str,
      rating: 0,
      nextQuestion:
        'Sorry, I didnt understand that. Could you please rephrase your answer?',
    };
    return contentObj;
  }
}

export default parseMessage;

let asd =
  '{ "rating_number": 5, "rating_feedback": "Your response was very comprehensive and provided a great overview of your experience and technical skills. It\'s clear that you have a strong foundation in software development and have worked on a variety of projects. I\'m impressed with your experience in developing scalable and fault-tolerant applications, as well as your familiarity with various cloud platforms. Overall, great response!", "next_question": "Can you tell me about a particularly challenging project you worked on and how you overcame any obstacles?" }';
