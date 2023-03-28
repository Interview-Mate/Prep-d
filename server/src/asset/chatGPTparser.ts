function parseMessage (str: any ) {
  const jsonStart = str.indexOf("{");
  const jsonEnd = str.lastIndexOf("}") + 1;
  const jsonString = str.slice(jsonStart, jsonEnd);

 try{
    const content = JSON.parse(jsonString);
      if (!content.rating_feedback || !content.rating_number || !content.next_question) {
        throw new Error(`Invalid object: required properties missing.`);
      }
    let contentObj = {
      feedback: content.rating_feedback,
      rating: parseFloat(content.rating_number),
      nextQuestion: content.next_question
    };
    return contentObj
  }
    catch (err: any){
    console.log(err.message)
    return undefined;
  }
}

export default parseMessage;

