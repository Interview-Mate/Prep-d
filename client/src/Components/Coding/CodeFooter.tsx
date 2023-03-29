import { Link } from "react-router-dom";

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
    <div className="mt-5 flex justify-between items-center">
      <div className="mx-4 w-10">
        {(number as number) + 1}/{problems.length}
      </div>
      <div className="w-fit">
        <button
          onClick={runCode}
          className="w-fit py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium"
        >
          Test solution
        </button>
      </div>
      <div className="ml-4 mr-10 w-10">
        {solved && (
          <Link to={"/Insights"}>
            <button
              onClick={handleNext}
              className="w-fit py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium"
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
