import { Link } from 'react-router-dom';

const CodeFooter = ({
  number,
  problems,
  runCode,
  solved,
  handleNext,
}: {
  problems: Problem[];
  number: number | undefined;
  solved: boolean | string;
  runCode: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className='mt-5 flex justify-between items-center'>
      <div className='mx-4 w-10'>
        {(number as number) + 1}/{problems.length}
      </div>
      <div className='w-fit'>
        <button
          onClick={runCode}
          className='border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-600 hover:text-white'
        >
          Test solution
        </button>
      </div>
      <div className='ml-4 mr-10 w-10'>
        {solved && (
          <Link to={'/Insights'}>
            <button
              onClick={handleNext}
              className='border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-600 hover:text-white'
            >
              Next
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CodeFooter;
