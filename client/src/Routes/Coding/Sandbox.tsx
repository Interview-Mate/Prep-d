import { useEffect } from 'react';
import { run } from '../../Util/safeEval';

const Sandbox = ({
  userInput,
  problem,
  safelyRunCode,
  onResult,
}: {
  userInput: string | undefined;
  problem: Problem | undefined;
  safelyRunCode: boolean;
  onResult: (results: Result[]) => void;
}) => {
  useEffect(() => {
    if (safelyRunCode) {
      const solution1 = problem?.solution1[0].replace(/"/g, "'");
      const solution2 = problem?.solution2[0].replace(/"/g, "'");
      const solution3 = problem?.solution3[0].replace(/"/g, "'");

      const result1 = run(userInput + solution1);
      const result2 = run(userInput + solution2);
      const result3 = run(userInput + solution3);
      onResult([result1, result2, result3]);
    }
  }, [safelyRunCode]);

  return <></>;
};

export default Sandbox;
