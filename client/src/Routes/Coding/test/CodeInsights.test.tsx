import { render, act } from '@testing-library/react';
import CodeInsights from '../CodeInsights';

describe('CodeInsights component', () => {
  HTMLCanvasElement.prototype.getContext = () => {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x: number, y: number, w: number, h: number) => {
        return {
          data: new Array(w * h * 4),
        };
      },
      putImageData: () => {},
      createImageData: () => {},
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => {
        return { width: 0 };
      },
    };
  };

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

  const score = 200;

  it('should render without crashing', async () => {
    await act(async () =>
      render(<CodeInsights problems={problems} score={score} />)
    );
  });

  it('should render the correct score', async () => {
    const { getByText } = await act(async () =>
      render(<CodeInsights problems={problems} score={score} />)
    );
    expect(getByText('200')).toBeInTheDocument();
  });

  it('should render the correct number of problems', async () => {
    const { getByText } = await act(async () =>
      render(<CodeInsights problems={problems} score={score} />)
    );
    expect(getByText('2')).toBeInTheDocument();
  });
});
