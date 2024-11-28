import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaCalendarAlt, FaListAlt, FaStopwatch, FaSmile, FaClipboardList } from "react-icons/fa"; // Icons import
import './Dashboard.css';
import VoiceCommand from './VoiceCommand'; // Import the Voice Command component

const Dashboard = () => {
  const navigate = useNavigate(); // To programmatically navigate based on voice commands

  // Handle Voice Commands
  const handleVoiceCommand = (command) => {
    if (command.includes('task')) {
      alert('Navigating to Tasks...');
      navigate("/tasks"); // Redirect to the tasks page
    } else if (command.includes('calendar')) {
      alert('Navigating to Calendar...');
      navigate("/calendar"); // Redirect to the calendar page
    } else if (command.includes('Pomodoro')) {
      alert('Starting Pomodoro Timer...');
      navigate("/pomodoro"); // Redirect to the Pomodoro timer page
    } else if (command.includes('encouragement')) {
      alert('Navigating to Encouragement...');
      navigate("/encouragement"); // Redirect to encouragement page
    } else if (command.includes('habit')) {
      alert('Navigating to Habit Tracking...');
      navigate("/habit-tracking"); // Redirect to habit tracking page
    } else {
      alert('Unknown command: ' + command);
    }
  };

  return (
    <div className="dashboard-page">
      <h2>Welcome to Your Study Space</h2>
      
      {/* Voice Command Component */}
      <VoiceCommand handleCommand={handleVoiceCommand} />

      <div className="button-container">
        
        {/* Tasks */}
        <div className="tooltip-container icon-button">
          <Link to="/tasks"><FaTasks className="icon" />Go to Tasks</Link>
          <span className="tooltip">View and manage your tasks</span>
        </div>

        {/* Calendar */}
        <div className="tooltip-container icon-button">
          <Link to="/calendar"><FaCalendarAlt className="icon" />View Calendar</Link>
          <span className="tooltip">Check your study schedule</span>
        </div>

        {/* Task List */}
        <div className="tooltip-container icon-button">
          <Link to="/tasklist"><FaListAlt className="icon" />View Task List</Link>
          <span className="tooltip">See all your tasks at a glance</span>
        </div>

        {/* Pomodoro Timer */}
        <div className="tooltip-container icon-button">
          <Link to="/pomodoro"><FaStopwatch className="icon" />Start Focus Session</Link>
          <span className="tooltip">Use the Pomodoro technique to focus</span>
        </div>

        {/* Encouragement */}
        <div className="tooltip-container icon-button">
          <Link to="/encouragement"><FaSmile className="icon" />Get Encouragement</Link>
          <span className="tooltip">Receive motivational tips</span>
        </div>

        {/* Habit Tracking */}
        <div className="tooltip-container icon-button">
          <Link to="/habit-tracking"><FaClipboardList className="icon" />Track Habits</Link>
          <span className="tooltip">Manage your daily and weekly habits</span>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
