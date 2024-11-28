// TaskCalendar.js
import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const TaskCalendar = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const events = tasks.map((task, index) => ({
    id: index,
    title: `${task.name} (${task.taskType})`,
    start: new Date(task.date),
    end: new Date(task.date),
    ...task, // Include all task details in the event
  }));

  useEffect(() => {
    const today = new Date();

    // Check for tasks due today and send a notification
    tasks.forEach((task) => {
      const taskDate = new Date(task.date);
      const isToday = taskDate.toDateString() === today.toDateString();

      if (isToday) {
        toast.info(`Reminder: Task "${task.name}" is due today!`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    });
  }, [tasks]);

  const handleSelectEvent = (event, e) => {
    setSelectedTask(event); // Set the clicked task as selected
    const rect = e.target.getBoundingClientRect(); // Get the event element's position
    setPopupPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 20, // Position popup slightly above
    });
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  return (
    <div className="calendar-container">
      <h2>Task Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: "100%" }}
        onSelectEvent={(event, e) => handleSelectEvent(event, e.nativeEvent)} // Capture the native event
      />

      {/* Popup Window Near Task */}
      {selectedTask && (
        <div
          className="popup-window"
          style={{ left: `${popupPosition.x}px`, top: `${popupPosition.y}px` }}
        >
          <h3>Task Details</h3>
          <p><strong>Name:</strong> {selectedTask.name}</p>
          <p><strong>Type:</strong> {selectedTask.taskType}</p>
          <p><strong>Subject:</strong> {selectedTask.subject}</p>
          <p><strong>Date:</strong> {new Date(selectedTask.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(selectedTask.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          <button className="close-popup-btn" onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;
