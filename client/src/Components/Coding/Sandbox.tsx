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
      const result1 = run(userInput + problem?.solution1[0].replace(/“|”/g, '"'));
      const result2 = run(userInput + problem?.solution2[0].replace(/“|”/g, '"'));
      const result3 = run(userInput + problem?.solution3[0].replace(/“|”/g, '"'));
      onResult([result1, result2, result3]);
    }
  }, [safelyRunCode]);

  return <></>;
};

export default Sandbox;
