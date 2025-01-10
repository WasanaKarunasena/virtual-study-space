// Dashboard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Wrap the component with BrowserRouter
import Dashboard from './Dashboard';

// Mock the VoiceCommand component
jest.mock('./VoiceCommand', () => ({
  __esModule: true,
  default: ({ handleCommand }) => {
    // Mock VoiceCommand component that triggers the handleCommand with a 'task' voice command
    return <button onClick={() => handleCommand('task')}>Mock Voice Command</button>;
  },
}));

describe('Dashboard Component', () => {
  // Helper function to render the component with necessary context
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  test('renders Dashboard page with heading', () => {
    renderWithRouter();
    // Check if the header is rendered
    const heading = screen.getByText(/Welcome to Your Study Space/i);
    expect(heading).toBeInTheDocument();
  });

  test('displays correct icons and links', () => {
    renderWithRouter();
    // Test if links and icons are present
    const tasksLink = screen.getByText(/Go to Tasks/i);
    expect(tasksLink).toBeInTheDocument();
    
    const calendarLink = screen.getByText(/View Calendar/i);
    expect(calendarLink).toBeInTheDocument();
    
    const taskListLink = screen.getByText(/View Task List/i);
    expect(taskListLink).toBeInTheDocument();

    const pomodoroLink = screen.getByText(/Start Focus Session/i);
    expect(pomodoroLink).toBeInTheDocument();

    const encouragementLink = screen.getByText(/Get Encouragement/i);
    expect(encouragementLink).toBeInTheDocument();

    const habitTrackingLink = screen.getByText(/Track Habits/i);
    expect(habitTrackingLink).toBeInTheDocument();
  });

  test('navigates correctly when voice command is triggered', () => {
    renderWithRouter();
    
    // Mock the alert function to track calls
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    // Trigger the mock VoiceCommand button click
    const voiceCommandButton = screen.getByText(/Mock Voice Command/i);
    fireEvent.click(voiceCommandButton);

    // Check if alert was called with the correct message
    expect(alertMock).toHaveBeenCalledWith('Navigating to Tasks...');
    
    // Clean up the mock
    alertMock.mockRestore();
  });

  test('shows tooltips for each icon', () => {
    renderWithRouter();
    // Test if the tooltips are visible when hovering over icons
    const tasksTooltip = screen.getByText(/View and manage your tasks/i);
    expect(tasksTooltip).toBeInTheDocument();
    
    const calendarTooltip = screen.getByText(/Check your study schedule/i);
    expect(calendarTooltip).toBeInTheDocument();
    
    const taskListTooltip = screen.getByText(/See all your tasks at a glance/i);
    expect(taskListTooltip).toBeInTheDocument();

    const pomodoroTooltip = screen.getByText(/Use the Pomodoro technique to focus/i);
    expect(pomodoroTooltip).toBeInTheDocument();

    const encouragementTooltip = screen.getByText(/Receive motivational tips/i);
    expect(encouragementTooltip).toBeInTheDocument();

    const habitTrackingTooltip = screen.getByText(/Manage your daily and weekly habits/i);
    expect(habitTrackingTooltip).toBeInTheDocument();
  });
});
