import React, { useState } from "react";
import "./TaskList.css";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({ name: "", date: "" });

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditedTask({
      name: tasks[index].name,
      date: new Date(tasks[index].date).toISOString().split("T")[0],
      time: new Date(tasks[index].date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      subject: tasks[index].subject,
      taskType: tasks[index].taskType,
    });
  };

  const handleEditSubmit = (index) => {
    const updatedTaskDate = new Date(`${editedTask.date}T${editedTask.time}`);
    updateTask(index, { ...tasks[index], name: editedTask.name, date: updatedTaskDate });
    setIsEditing(null);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTask = { ...tasks[index], isCompleted: !tasks[index].isCompleted };
    updateTask(index, updatedTask);
  };

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.isCompleted ? "completed" : ""}`}>
              {isEditing === index ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editedTask.name}
                    onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                    className="task-input"
                  />
                  <input
                    type="date"
                    value={editedTask.date}
                    onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
                    className="task-input"
                  />
                  <input
                    type="time"
                    value={editedTask.time}
                    onChange={(e) => setEditedTask({ ...editedTask, time: e.target.value })}
                    className="task-input"
                  />
                  <button onClick={() => handleEditSubmit(index)} className="save-btn">
                    Save
                  </button>
                  <button onClick={() => setIsEditing(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-info">
                  <div>
                    <p className="task-name">
                      {task.name}
                      {task.isCompleted && (
                        <span
                          style={{
                            color: "green",
                            fontSize: "1.5em",
                            marginLeft: "5px",
                            verticalAlign: "middle",
                          }}
                        >
                          ✔
                        </span>
                      )}
                    </p>
                    <p className="task-subject">Subject: {task.subject}</p>
                    <p className="task-type">Type: {task.taskType}</p>
                    <p className="task-date">
                      {new Date(task.date).toLocaleDateString()} -{" "}
                      {new Date(task.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleEdit(index)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => deleteTask(index)} className="delete-btn">
                      Delete
                    </button>
                    <button
                      onClick={() => toggleTaskCompletion(index)}
                      className={task.isCompleted ? "mark-incomplete-btn" : "mark-complete-btn"}
                    >
                      {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="no-tasks">No tasks added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
