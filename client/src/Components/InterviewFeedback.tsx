import { Rating } from 'flowbite-react';
interface InterviewFeedback {
  rating: number;
  feedback: string;
  suggestions: string;
}
function InterviewFeedback(interviewFeedback: InterviewFeedback) {
  const { rating, feedback, suggestions } = interviewFeedback;
  return (
    <div className='max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
      <div className='w-fit items-center justify-center p-10 space-y-8 bg-white rounded-lg shadow '>
        <h1 className='text-center text-xl mb-5 font-bold tracking-tight'>
          Feedback and Suggestions
        </h1>
        <p className='flex flex-row'>
          <span className='font-bold mr-1'>Overall rating{' '}</span>
          {' '}
          <Rating>
            {rating >= 1 ? (
              <Rating.Star filled={rating >= 1} color={'#4FBBBD'} />
            ) : (
              <Rating.Star filled={rating >= 1}color={'gray'} />
            )}
            {rating >= 2 ? (
              <Rating.Star filled={rating >= 2} color={'#4FBBBD'} />
            ) : (
              <Rating.Star filled={rating >= 2} color={'gray'} />
            )}
            {rating >= 3 ? (
              <Rating.Star filled={rating >= 3} color={'#4FBBBD'} />
            ) : (
              <Rating.Star filled={rating >= 3} color={'gray'}/>
            )}
            {rating >= 4 ? (
              <Rating.Star filled={rating >= 4} color={'#4FBBBD'} />
            ) : (
              <Rating.Star filled={rating >= 4} color={'gray'}/>
            )}
            {rating >= 5 ? (
              <Rating.Star filled={rating >= 5} color={'#4FBBBD'} />
            ) : (
              <Rating.Star filled={rating >= 5} color={'gray'}/>
            )}
          </Rating>
        </p>
        <p>
          <span className='font-bold'>Feedback </span>
          {feedback}
        </p>
        <p>
          <span className='font-bold'>Suggestions </span>
          {suggestions}
        </p>
      </div>
    </div>
  );
}
export default InterviewFeedback;