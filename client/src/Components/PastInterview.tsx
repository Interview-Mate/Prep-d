import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Badge, Rating } from 'flowbite-react';

export default function PastInterview({ interview }: { interview: Interview }) {
  const [expand, setExpand] = useState(false);
  const [averageRating, setAverageRating] = useState();
  const [overall, setOverall] = useState();
  const cleanArr = interview.conversation.slice(1);

  useEffect(() => {
    if (cleanArr.length > 0) {
      const avg = cleanArr
        .filter((message: { role: string }) => message.role === 'assistant')
        .slice(1)
        .map((message: { content: any }) => {
          const { content } = message;
          return isJsonString(content) ? JSON.parse(content).rating_number : 1;
        });

      if (avg.length > 0) {
        const average = Math.round(
          avg.reduce((acc, curr) => acc + curr, 0) / avg.length
        );
        setAverageRating(average);
      }
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

  const regex1 = /Rating:[\s\S]*/;
  const regex2 = /{[^{}]*}/g;

  return (

      <div className='past-interview'>
        <div className=' rounded-md mt-5 bg-white p-4 mb-5 text-sm -space-y-px  h-4/5 min-h-max w-full flex flex-col'>
          <div className='past-interview-head m-2 mb-3'>
            Interview for {interview.title} at {interview.company}
          </div>
          <div className=' m-2 flex flex-row'>
            <h2 className='font-bold'>Date</h2>
            <div className='ml-2 '>{date}</div>
          </div>
          {/* {averageRating && (
            <div className='mt-2'>
              <div className='m-2 font-bold flex flex-row'>
                <h2 className='mr-1 '>Average answer rating</h2>
                <Rating>
                  {averageRating >= 1 ? (
                    <Rating.Star
                      filled={averageRating >= 1}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={averageRating >= 1} />
                  )}
                  {averageRating >= 2 ? (
                    <Rating.Star
                      filled={averageRating >= 2}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={averageRating >= 2} />
                  )}
                  {averageRating >= 3 ? (
                    <Rating.Star
                      filled={averageRating >= 3}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={averageRating >= 3} />
                  )}
                  {averageRating >= 4 ? (
                    <Rating.Star
                      filled={averageRating >= 4}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={averageRating >= 4} />
                  )}
                  {averageRating >= 5 ? (
                    <Rating.Star
                      filled={averageRating >= 5}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={averageRating >= 5} />
                  )}
                </Rating>
              </div>
            </div>
          )} */}
          {overall && (
            <div className='mt-2'>
              <div className='m-2 font-bold flex flex-row'>
                <h2 className='mr-1 '>Rating </h2>
                <Rating>
                  {overall.overall_number >= 1 ? (
                    <Rating.Star
                      filled={overall.overall_number >= 1}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={overall.overall_number >= 1} />
                  )}
                  {overall.overall_number >= 2 ? (
                    <Rating.Star
                      filled={overall.overall_number >= 2}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={overall.overall_number >= 2} />
                  )}
                  {overall.overall_number >= 3 ? (
                    <Rating.Star
                      filled={overall.overall_number >= 3}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={overall.overall_number >= 3} />
                  )}
                  {overall.overall_number >= 4 ? (
                    <Rating.Star
                      filled={overall.overall_number >= 4}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={overall.overall_number >= 4} />
                  )}
                  {overall.overall_number >= 5 ? (
                    <Rating.Star
                      filled={overall.overall_number >= 5}
                      color={'#4fbbbd'}
                    />
                  ) : (
                    <Rating.Star filled={overall.overall_number >= 5} />
                  )}
                </Rating>
              </div>

              <h2 className=' m-2 font-bold'>Feedback</h2>

              <div className='ml-2 mb-2'>{overall.overall_feedback}</div>

              <h2 className=' ml-2 font-bold'>Suggestions</h2>

              <div className=' ml-2'>{overall.suggestions}</div>
            </div>
          )}
          {!overall && (
            <div className='mt-2'>
              <h2 className='text-sm ml-2'> No feedback yet</h2>
            </div>
          )}
        </div>
        <button id='expand-button' onClick={() => setExpand((prev) => !prev)}>
          <Badge>
            <div className='flex justify-center items-center  bg-slate-200 p-1.5 rounded-md text-slate-700'>
              {expand ? (
                <>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 mr-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5.5 15.25l7.5-7.5 7.5 7.5'
                    />
                  </svg>
                  Hide Transcript
                </>
              ) : (
                <>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 mr-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                  Show Transcript
                </>
              )}
            </div>
          </Badge>

          {/* <img
          src={Expand}
          style={{
            maxWidth: 20,
            marginBottom: 5,
          }}
          alt='Expand the interview and get more detail'
        /> */}
        </button>
        <div className='past-interview-body'>
          {expand
            ? cleanArr.map((convo: any, index: number) => (
                <>
                  {index % 2 === 0 && (
                    <div className='float-right mt-10'>
                      <Rating>
                        {isJsonString(convo.content)
                          ? JSON.parse(convo.content).rating_number >= 1
                            ? JSON.parse(convo.content).rating_number >= 1 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 1
                                  }
                                  color={'#4fbbbd'}
                                />
                              )
                            : JSON.parse(convo.content).rating_number >= 1 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 1
                                  }
                                />
                              )
                          : null}
                        {isJsonString(convo.content)
                          ? JSON.parse(convo.content).rating_number >= 2
                            ? JSON.parse(convo.content).rating_number >= 2 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 2
                                  }
                                  color={'#4fbbbd'}
                                />
                              )
                            : JSON.parse(convo.content).rating_number >= 2 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 2
                                  }
                                />
                              )
                          : null}
                        {isJsonString(convo.content)
                          ? JSON.parse(convo.content).rating_number >= 3
                            ? JSON.parse(convo.content).rating_number >= 3 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 3
                                  }
                                  color={'#4fbbbd'}
                                />
                              )
                            : JSON.parse(convo.content).rating_number >= 3 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 3
                                  }
                                />
                              )
                          : null}
                        {isJsonString(convo.content)
                          ? JSON.parse(convo.content).rating_number >= 4
                            ? JSON.parse(convo.content).rating_number >= 4 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 4
                                  }
                                  color={'#4fbbbd'}
                                />
                              )
                            : JSON.parse(convo.content).rating_number >= 4 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 4
                                  }
                                />
                              )
                          : null}
                        {isJsonString(convo.content)
                          ? JSON.parse(convo.content).rating_number >= 5
                            ? JSON.parse(convo.content).rating_number >= 5 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 5
                                  }
                                  color={'#4fbbbd'}
                                />
                              )
                            : JSON.parse(convo.content).rating_number >= 5 && (
                                <Rating.Star
                                  filled={
                                    JSON.parse(convo.content).rating_number >= 5
                                  }
                                />
                              )
                          : null}
                      </Rating>
                    </div>
                  )}
                  <div
                    key={index}
                    className={index % 2 === 0 ? 'left-convo' : 'right-convo'}
                  >
                    <div>
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
                    {convo.cloudinary_url && (
                      <div className='float-right mt-5'>
                        <audio controls>
                          <source
                            src={convo.cloudinary_url}
                            type='audio/mpeg'
                          />
                        </audio>

                      </div>
                    )}
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
  );
}
