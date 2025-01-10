// HabitTracking.js
import React, { useState, useEffect } from 'react';
import './HabitTracking.css';
import { toast } from "react-toastify";

const HabitTracking = () => {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const addHabit = (e) => {
    e.preventDefault();
    if (habitInput) {
      setHabits([...habits, { name: habitInput, frequency, progress: 0 }]);
      setHabitInput('');
    }
  };

  const updateProgress = (index, value) => {
    const updatedHabits = [...habits];
    updatedHabits[index].progress = value;
    setHabits(updatedHabits);

    // Trigger a notification when a habit reaches 100% progress
    if (value === "100") {
      toast.success(`Great job! You've completed the habit: ${updatedHabits[index].name}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="habit-tracking">
      <h2>Habit Tracking Dashboard</h2>

      <div className="add-habit-container">
        <form onSubmit={addHabit} className="add-habit-form">
          <input
            type="text"
            placeholder="Enter new habit"
            value={habitInput}
            onChange={(e) => setHabitInput(e.target.value)}
            required
          />
          <label>
            Frequency:
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>

          <button type="submit">Add Habit</button>
        </form>

        <div className="habit-list">
          <h3>Your Habits</h3>
          <ul>
            {habits.length === 0 && <p>No habits added yet. Start tracking!</p>}
            {habits.map((habit, index) => (
              <li key={index}>
                <div className="habit-info">
                  <span>{habit.name} ({habit.frequency})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={habit.progress}
                  onChange={(e) => updateProgress(index, e.target.value)}
                />
                <span>{habit.progress}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="progress-summary">
        <h3>Habit Progress Overview</h3>
        <p>Total Habits: {habits.length}</p>
        <p>
          Average Progress: 
          {habits.length > 0
            ? `${(
                habits.reduce((acc, habit) => acc + parseInt(habit.progress), 0) / habits.length
              ).toFixed(1)}%`
            : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default HabitTracking;
