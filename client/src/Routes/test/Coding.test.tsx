import { render, fireEvent, act } from '@testing-library/react';
import Coding from '../Coding';

// describe('Coding component', () => {
//   it('should render without crashing', async () => {
//     await act( async () => render(<Coding/>));
//   });

  // test('shows the first problem', () => {
  //   const { getByTestId } = render(<Coding />);
  //   expect(getByTestId('problem-card')).toHaveTextContent('Problem 1');
  // });

  // test('allows user input', () => {
  //   const { getByLabelText } = render(<Coding />);
  //   const input = getByLabelText('User Input');
  //   fireEvent.change(input, { target: { value: 'function add(a, b) { return a + b; }' } });
  //   expect(input.value).toBe('function add(a, b) { return a + b; }');
  // });

  // test('displays code insights after running code', async () => {
  //   const { getByText, getByLabelText } = render(<Coding />);
  //   const runButton = getByText('Run Code');
  //   const input = getByLabelText('User Input');
  //   fireEvent.change(input, { target: { value: 'function add(a, b) { return a + b; }' } });
  //   fireEvent.click(runButton);
  //   const insights = await getByText('Code Insights');
  //   expect(insights).toBeInTheDocument();
  // });

  // test('advances to the next problem after clicking Next', async () => {
  //   const { getByText } = render(<Coding />);
  //   const nextButton = getByText('Next');
  //   const runButton = getByText('Run Code');
  //   fireEvent.click(runButton);
  //   fireEvent.click(nextButton);
  //   expect(getByText('Problem 2')).toBeInTheDocument();
  // });
// });
