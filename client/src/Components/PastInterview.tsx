import Expand from '../Assets/full-screen.png';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function PastInterview({ interview }: { interview: Interview }) {
  const [expand, setExpand] = useState(false);
  const [averageRating, setAverageRating] = useState([]);
  const [overall, setOverall] = useState();
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
      if (interview.overall.length !== 0) {
        if (isJsonString(interview.overall[0])) {
          setOverall(JSON.parse(interview.overall[0]));
        }
      }
    }
  }, []);
  const date = format(new Date(interview.date), 'PPPP');

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

  const regex1 = /Rating:[\s\S]*/;
  const regex2 = /{[^{}]*}/g;

  return (
    <div className='past-interview'>
      <button id='expand-button' onClick={() => setExpand((prev) => !prev)}>
        <img
          src={Expand}
          style={{
            maxWidth: 20,
            marginBottom: 5,
          }}
          alt='Expand the interview and get more detail'
        />
      </button>
      <div className='past-interview-head'>
        Your interview for {interview.title} at {interview.company} on {date}
      </div>
          
      <div className='shadow rounded-md mt-5  p-4 mb-5  -space-y-px  h-4/5 min-h-max w-full flex flex-col'>
        {averageRating.length > 0 && (
          <h2 className='text-sm m-2'>
            <span className=' font-bold'>
              Average answer rating
              <span className='text-red-500'>
                {' '}
                {Math.round(
                  averageRating.reduce((acc, curr) => acc + curr, 0) /
                    averageRating.length
                )}{' '}
              </span>
            </span>
            / 5
          </h2>
        )}
        {overall && (
          <div className='text-sm'>
            <h2 className=' ml-2 mb-2'>
              <span className='font-bold'>
                Overall rating
                <span className='text-red-500'> {overall.overall_number} </span>
              </span>
              / 5
            </h2>

            <h2 className=' ml-2 font-bold'>Feedback</h2>

            <div className='ml-2 mb-2'>{overall.overall_feedback}</div>

            <h2 className=' ml-2 font-bold'>Suggestions</h2>

            <div className=' ml-2'>{overall.suggestions}</div>
          </div>
        )}
      </div>

      <div className='past-interview-body'>
        {expand
          ? cleanArr.map((convo: any, index: number) => (
              <div
                key={index}
                className={index % 2 === 0 ? 'left-convo' : 'right-convo'}
              >
                {isJsonString(convo.content)
                  ? JSON.parse(convo.content).rating_feedback
                  : convo.content
                      .replace(regex1, '')
                      .replace(regex2, '')
                      .replace(
                        'Rate my response out of 5 with a comment. Then continue to the next question. return this as a JSON object without plus signs in this format {rating_number: input the rating you gave me as a number , rating_feedback: ',
                        ''
                      )
                      .replace(
                        'the feedback you gave me to the previous question ,next_question: your next question}.',
                        ''
                      )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
