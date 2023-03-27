import Expand from "../Assets/full-screen.png";
import { useState } from "react";

export default function PastInterview({ interview }: { interview: Interview }) {
  const cleanArr = interview.conversation.slice(1);
  const [expand, setExpand] = useState(false);

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return (
    <div className="past-interview">
      <div className="past-interview-head">
        Your interview on {interview.date}
        <button onClick={() => setExpand((prev) => !prev)}>
          <img
            src={Expand}
            style={{
              maxWidth: 20,
            }}
          />
        </button>
      </div>
      <div className="past-interview-body">
        {expand
          ? cleanArr.map((convo: any, index: number) => (
              <>
                <div
                  key={index}
                  className={index % 2 === 0 ? "left-convo" : "right-convo"}
                >
                  {isJsonString(convo.content)
                    ? JSON.parse(convo.content).rating_feedback
                    : convo.content
                        .replace(
                          "Rate my response out of 5 with a comment. Then continue to the next question. return this as a JSON object without plus signs in this format {rating_number: input the rating you gave me as a number , rating_feedback: ",
                          ""
                        )
                        .replace(
                          "the feedback you gave me to the previous question ,next_question: your next question}.",
                          ""
                        )}
                </div>
              </>
            ))
          : null}
      </div>
    </div>
  );
}
