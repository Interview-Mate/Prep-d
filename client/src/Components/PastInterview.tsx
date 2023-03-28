import Expand from '../Assets/full-screen.png';
import { useEffect, useState } from 'react';

export default function PastInterview({ interview }: { interview: Interview }) {
  const [expand, setExpand] = useState(false);
  const [averageRating, setAverageRating] = useState([]);
  const cleanArr = interview.conversation.slice(1);

  useEffect(() => {
    if (cleanArr.length > 0) {
      const avg = cleanArr
        .filter((message: { role: string }) => message.role === 'assistant')
        .slice(1)
        .map((message: { content: any }) => {
          const { content } = message;
          return isJsonString(content)
            ? JSON.parse(content).rating_number
            : null;
        })
        .filter((rating: null) => rating !== null);
      setAverageRating(avg);
    }
  }, []);

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const expandInterview = () => {
    setExpand((prev) => !prev);
  };

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
      <div
        className='border border-teal-600 rounded-md mt-5 p-4 h-4/5 min-h-max w-full flex flex-col'
        style={{ background: 'rgba(252, 252, 252, 1)' }}
      >
        {averageRating.length > 0 && (
          <h2 className='text-sm'>
            Average answer rating{' '}
            <span className='text-sm font-bold'>
              {Math.round(
                averageRating.reduce((acc, curr) => acc + curr, 0) /
                  averageRating.length
              )}
            </span>
          </h2>
        )}
        {interview.overall.length > 0 && (
          <h2 className='text-sm'>
            Overall rating{' '}
            <span className='text-sm font-bold'>{interview.overall}</span>
          </h2>
        )}
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
