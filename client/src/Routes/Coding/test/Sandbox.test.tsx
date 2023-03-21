import { render, act } from '@testing-library/react';
import Sandbox from '../Sandbox';

jest.mock('../../../Util/safeEval', () => {
  return {
    run: (code: string) => {
      const result = {
        input: code,
        output: eval(code),
        error: '',
        runtime: 1,
      };
      return result;
    },
  };
});

describe('Sandbox component', () => {
  const userInput = 'function add(a, b) { return a + b; }';
  const problem = {
    name: 'Simple Addition',
    description:
      'Write a function that takes two numbers as arguments and returns the sum.',
    hint: 'You can use addition.',
    function: 'function add(a, b) {\n\n  //Insert your code \n\n};',
    solution1: ['add(1, 1);', 2],
    solution2: ['add(2, 8);', 10],
    solution3: ['add(44, 3);', 47],
    language: 'javascript',
    level: 1,
  };

  const safelyRunCode = jest.fn();

  const setResults = jest.fn();


  it('should render without crashing', async () => {
    await act(async () =>
      render(
        <Sandbox
          userInput={userInput}
          problem={problem}
          safelyRunCode={safelyRunCode}
          onResult={(receivedResults: Result[]) => setResults(receivedResults)}
        />
      )
    );
  });

  it('should return the correct results when safelyRunCode is called', async () => {
    await act(async () =>
      render(
        <Sandbox
          userInput={userInput}
          problem={problem}
          safelyRunCode={safelyRunCode}
          onResult={(receivedResults: Result[]) => setResults(receivedResults)}
        />
      )
    );
    expect(setResults).toHaveBeenCalledWith([
      {
        input: 'function add(a, b) { return a + b; }add(1, 1);',
        output: 2,
        error: '',
        runtime: 1,
      },
      {
        input: 'function add(a, b) { return a + b; }add(2, 8);',
        output: 10,
        error: '',
        runtime: 1,
      },
      {
        input: 'function add(a, b) { return a + b; }add(44, 3);',
        output: 47,
        error: '',
        runtime: 1,
      },
    ]);
  });
});
