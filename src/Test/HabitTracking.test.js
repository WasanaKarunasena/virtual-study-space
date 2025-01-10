import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';
import HabitTracking from './HabitTracking';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('HabitTracking Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Habit Tracking Dashboard', () => {
    render(<HabitTracking />);
    expect(screen.getByText(/Habit Tracking Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Habits/i)).toBeInTheDocument();
    expect(screen.getByText(/Habit Progress Overview/i)).toBeInTheDocument();
  });

  test('adds a new habit', () => {
    render(<HabitTracking />);
    const input = screen.getByPlaceholderText(/Enter new habit/i);
    const addButton = screen.getByText(/Add Habit/i);

    fireEvent.change(input, { target: { value: 'Drink Water' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Drink Water \(daily\)/i)).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('displays default message when no habits are added', () => {
    render(<HabitTracking />);
    expect(screen.getByText(/No habits added yet. Start tracking!/i)).toBeInTheDocument();
  });

  test('updates habit progress', () => {
    render(<HabitTracking />);
    const input = screen.getByPlaceholderText(/Enter new habit/i);
    const addButton = screen.getByText(/Add Habit/i);

    fireEvent.change(input, { target: { value: 'Exercise' } });
    fireEvent.click(addButton);

    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '50' } });

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('triggers toast notification when progress reaches 100%', () => {
    render(<HabitTracking />);
    const input = screen.getByPlaceholderText(/Enter new habit/i);
    const addButton = screen.getByText(/Add Habit/i);

    fireEvent.change(input, { target: { value: 'Meditation' } });
    fireEvent.click(addButton);

    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '100' } });

    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining("Great job! You've completed the habit: Meditation"),
      expect.objectContaining({
        position: 'top-right',
        autoClose: 5000,
      })
    );
  });

 
});
