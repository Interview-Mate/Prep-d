import { render, fireEvent, act } from '@testing-library/react';
import CodeFooter from '../CodeFooter';

describe('CodeFooter component', () => {
  const problems = [
    {
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
    },
    {
      name: 'Reverse String',
      description:
        'Write a function that reverses a string and returns the reversed string.',
      hint: 'You can split an string into an array.',
      function: 'function reverseString(str) {\n\n  //Insert your code \n\n};',
      solution1: ['reverseString("hello");', 'olleh'],
      solution2: ['reverseString("world");', 'dlrow'],
      solution3: ['reverseString("Codeworks");', 'skrowedoC'],
      language: 'javascript',
      level: 1,
    },
  ];

  const number = 0;

  const runCode = jest.fn();

  const solved = false;

  const handleNext = jest.fn();

  it('should render without crashing', async () => {
    await act(async () =>
      render(
        <CodeFooter
          problems={problems}
          number={number}
          runCode={runCode}
          solved={solved}
          handleNext={handleNext}
        />
      )
    );
  });

  it('should render the correct problem number', async () => {
    const { getByText } = await act(async () =>
      render(
        <CodeFooter
          problems={problems}
          number={number}
          runCode={runCode}
          solved={solved}
          handleNext={handleNext}
        />
      )
    );

    expect(getByText('1/2')).toBeInTheDocument();
  });

  it('should trigger the runCode function when the run button is clicked', async () => {
    const { getByText } = await act(async () =>
      render(
        <CodeFooter
          problems={problems}
          number={number}
          runCode={runCode}
          solved={solved}
          handleNext={handleNext}
        />
      )
    );

    fireEvent.click(getByText('Test solution'));

    expect(runCode).toHaveBeenCalled();
  })
});
