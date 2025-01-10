import { render, screen, fireEvent } from '@testing-library/react';
import Encouragement from './Encouragement';
import RandomIcons from './RandomIcons';  // Import RandomIcons component for mocking

// Mock RandomIcons component
jest.mock('./RandomIcons', () => () => <div data-testid="mock-random-icons" />);

test('renders the "New Tip" button and triggers a tip change', () => {
  render(<Encouragement />);

  // Get the initial tip text using a regex pattern
  const initialTip = screen.getByText((content) =>
    /You are capable of more than you know|Believe in yourself|Every small step counts|Stay focused|Don't watch the clock/.test(content)
  );

  // Click the "New Tip" button
  fireEvent.click(screen.getByText(/New Tip/i));

  // Ensure a different tip is displayed after clicking (check using a regex)
  const newTip = screen.getByText((content) =>
    /You are capable of more than you know|Believe in yourself|Every small step counts|Stay focused|Don't watch the clock/.test(content) && content !== initialTip.textContent
  );
  expect(newTip).toBeInTheDocument();
});
