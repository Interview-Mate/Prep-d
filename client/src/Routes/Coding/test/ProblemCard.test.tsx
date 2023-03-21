import { render, act } from '@testing-library/react';
import ProblemCard from '../ProblemCard';

describe('ProblemCard component with solved state', () => {
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

  const score = 200;
  const solved = true;
  const error = '';
  const runtime = 0;
  const solveTime = 523434;
  const tests = 3;

  it('should render without crashing', async () => {
    await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
  });

  it('should render the correct problem name', async () => {
    const { getByText } = await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
    expect(getByText('Simple Addition')).toBeInTheDocument();
  });

  it('should render the correct problem description', async () => {
    const { getByText } = await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
    expect(
      getByText(
        'Write a function that takes two numbers as arguments and returns the sum.'
      )
    ).toBeInTheDocument();
  });

  it('should render the correct score', async () => {
    const { getByText } = await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
    expect(getByText('200')).toBeInTheDocument();
  });

  it('should show that the problem is solved', async () => {
    const { getByText } = await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
    expect(getByText('Correct solution!')).toBeInTheDocument();
  });


  // it('should show the amount of passed tests', async () => {
  //   const { getByText } = await act(async () =>
  //     render(
  //       <ProblemCard
  //         problem={problem}
  //         score={score}
  //         tests={tests}
  //         solved={solved}
  //         error={error}
  //         runtime={runtime}
  //         solveTime={solveTime}
  //       />
  //     )
  //   );
  //   expect(getByText('3')).toBeInTheDocument();
  // });

  // it('should show the hint when clicked', async () => {
  //   const { getByText } = await act(async () =>
  //     render(
  //       <ProblemCard
  //         problem={problem}
  //         score={score}
  //         tests={tests}
  //         solved={solved}
  //         error={error}
  //         runtime={runtime}
  //         solveTime={solveTime}
  //       />
  //     )
  //   );
  //   const hintButton = getByText('Get a hint');
  //   hintButton.click();
  //   expect(getByText('You can use addition.')).toBeInTheDocument();
  // });
});


describe('ProblemCard component with solved state', () => {
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

  const score = 200;
  const solved = false;
  const error = 'Error message';
  const runtime = 0;
  const solveTime = 523434;
  const tests = 3;

  it('should show that the problem is not solved', async () => {
    const { getByText } = await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
    expect(getByText('Wrong solution!')).toBeInTheDocument();
  });

  it('should show the error message', async () => {
    const { getByText } = await act(async () =>
      render(
        <ProblemCard
          problem={problem}
          score={score}
          tests={tests}
          solved={solved}
          error={error}
          runtime={runtime}
          solveTime={solveTime}
        />
      )
    );
    expect(getByText('Error message')).toBeInTheDocument();
  });

});
