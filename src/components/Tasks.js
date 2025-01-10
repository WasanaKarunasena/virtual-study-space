import React, { useState } from "react";
import './Tasks.css';

const Tasks = ({ addTask }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [taskType, setTaskType] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [subjects, setSubjects] = useState(["Math", "Chemistry", "Biology", "Physics", "Computer Science"]);
  const taskTypes = ["Assignment", "Reminder", "Revision", "Essay", "Group Project", "Reading", "Meeting"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && date && time && subject && taskType) {
      const taskDate = new Date(`${date}T${time}`);
      addTask({ name, subject, taskType, date: taskDate });
      setName("");
      setDate("");
      setTime("");
      setSubject("");
      setTaskType("");
      setCustomSubject("");
    }
  };

  const handleAddSubject = () => {
    if (customSubject && !subjects.includes(customSubject)) {
      setSubjects([...subjects, customSubject]);
      setSubject(customSubject);
      setCustomSubject("");
    }
  };

  return (
    <div className="tasks-page">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Subject Selection */}
        <div className="subject-container">
          <p>Select Subject*</p>
          <div className="options">
            {subjects.map((subj, index) => (
              <button
                key={index}
                type="button"
                className={subject === subj ? "active" : ""}
                onClick={() => setSubject(subj)}
              >
                {subj}
              </button>
            ))}
            <input
              type="text"
              placeholder="New Subject"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
            />
            <button type="button" onClick={handleAddSubject}>
              + Add Subject
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Task Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Date and Time Selection */}
        <div className="date-time">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Task Type Selection */}
        <div className="type-container">
          <p>Type*</p>
          <div className="options">
            {taskTypes.map((type, index) => (
              <button
                key={index}
                type="button"
                className={taskType === type ? "active" : ""}
                onClick={() => setTaskType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default Tasks;
