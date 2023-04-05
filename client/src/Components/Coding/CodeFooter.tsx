import { Link } from 'react-router-dom';
import Button from '../Button';

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
      <div onClick={runCode}>
        <Button>Test solution</Button>
      </div>
      <div className='ml-4 mr-10 w-10'>
        {solved && (
          <Link to={'/Insights'} onClick={handleNext}>
            <Button>Next</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CodeFooter;
