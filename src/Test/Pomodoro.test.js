import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Pomodoro from './Pomodoro';

jest.useFakeTimers();

describe('Pomodoro Component', () => {
  test('renders Pomodoro Timer with default values', () => {
    render(<Pomodoro />);
    expect(screen.getByText(/Pomodoro Timer/i)).toBeInTheDocument();
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  test('starts and decreases timer on Start button click', () => {
    render(<Pomodoro />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    
    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText('24:59')).toBeInTheDocument();
  });

  test('pauses the timer on Pause button click', () => {
    render(<Pomodoro />);
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');
    
    fireEvent.click(startButton);
    act(() => jest.advanceTimersByTime(1000));
    fireEvent.click(pauseButton);

    act(() => jest.advanceTimersByTime(2000));
    expect(screen.getByText('24:59')).toBeInTheDocument(); // Timer stays paused
  });

  test('resets the timer on Stop button click', () => {
    render(<Pomodoro />);
    const startButton = screen.getByText('Start');
    const stopButton = screen.getByText('Stop');
    
    fireEvent.click(startButton);
    act(() => jest.advanceTimersByTime(5000)); // 5 seconds pass
    fireEvent.click(stopButton);

    expect(screen.getByText('25:00')).toBeInTheDocument(); // Reset to default time
  });

  test('updates timer based on user input', () => {
    render(<Pomodoro />);
    const input = screen.getByLabelText(/Set Timer \(minutes\):/i);
    fireEvent.change(input, { target: { value: 10 } });
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  
});
