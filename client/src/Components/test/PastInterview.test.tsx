import { render, screen } from '@testing-library/react';
import PastInterview from '../PastInterview';

describe('PastInterview', () => {
  const interview = {
    title: 'Software Developer',
    company: 'Codeworks',
    date: new Date('2023-28-03T00:00:00.000Z'),
    conversation: [
      { role: 'assistant', content: 'Hello, how are you doing today?' },
      {
        role: 'candidate',
        content: 'I am doing well, thank you for asking. How about you?',
      },
      {
        role: 'assistant',
        content: '{"rating_number": 4, "rating_feedback": "Good job!"}',
      },
    ],
    overall: '4.5',
  };

  it('renders interview title, company and date', () => {
    render(<PastInterview interview={interview} />);
    const title = screen.getByText('Your interview for Software Developer at Codeworks on Tuesday, March 28th 2023');
    expect(title).toBeInTheDocument();
  });

  it('renders expand button', () => {
    render(<PastInterview interview={interview} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('expands interview conversation when expand button is clicked', () => {
    render(<PastInterview interview={interview} />);
    const button = screen.getByRole('button');
    button.click();
    const conversation = screen.getByText('I am doing well, thank you for asking. How about you?');
    expect(conversation).toBeInTheDocument();
  });

  it('calculates and displays average rating', () => {
    render(<PastInterview interview={interview} />);
    const averageRating = screen.getByText('Average answer rating 4');
    expect(averageRating).toBeInTheDocument();
  });

  it('displays overall rating', () => {
    render(<PastInterview interview={interview} />);
    const overallRating = screen.getByText('Overall rating 4.5');
    expect(overallRating).toBeInTheDocument();
  });
});
