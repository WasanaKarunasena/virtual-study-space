import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import TaskList from "./components/TaskList";
import TaskCalendar from "./components/Calendar";
import Pomodoro from "./components/Pomodoro";
import Encouragement from "./components/Encouragement";
import HabitTracking from "./components/HabitTracking"; 
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]); // State for tracking habits

  // Add new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
    toast.success(`New task "${task.name}" added!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Update task
  const updateTask = (index, updatedTask) => {
    const newTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(newTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    toast.info(`Task "${taskToDelete.name}" deleted.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Add new habit
  const addHabit = (habit) => {
    setHabits([...habits, { ...habit, progress: 0 }]);
    toast.success(`New habit "${habit.name}" added!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Update habit progress
  const updateHabitProgress = (index, progress) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, progress } : habit
    );
    setHabits(updatedHabits);

    if (progress === 100) {
      toast.success(`Habit "${habits[index].name}" completed!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Real-time notifications for tasks due today
  useEffect(() => {
    const today = new Date().toDateString();
    tasks.forEach((task) => {
      if (new Date(task.date).toDateString() === today) {
        toast.info(`Reminder: Task "${task.name}" is due today!`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    });
  }, [tasks]);

  return (
    <Router>
      <ToastContainer /> {/* Set up ToastContainer for global notifications */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks addTask={addTask} />} />
        <Route path="/calendar" element={<TaskCalendar tasks={tasks} />} />
        <Route 
          path="/tasklist" 
          element={<TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />} 
        />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/encouragement" element={<Encouragement />} />

        {/* Route for HabitTracking with necessary props */}
        <Route 
          path="/habit-tracking" 
          element={<HabitTracking 
            habits={habits} 
            updateHabitProgress={updateHabitProgress}
            addHabit={addHabit} 
          />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
