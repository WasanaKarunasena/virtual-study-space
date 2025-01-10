import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";

describe("TaskList Component", () => {
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();

  const tasks = [
    {
      name: "Task 1",
      date: new Date("2024-12-25T10:00").toISOString(),
      subject: "Math",
      taskType: "Assignment",
      isCompleted: false,
    },
    {
      name: "Task 2",
      date: new Date("2024-12-26T15:30").toISOString(),
      subject: "Science",
      taskType: "Test",
      isCompleted: true,
    },
  ];

 

  test("shows 'No tasks added yet' when there are no tasks", () => {
    render(<TaskList tasks={[]} updateTask={mockUpdateTask} deleteTask={mockDeleteTask} />);
    expect(screen.getByText("No tasks added yet.")).toBeInTheDocument();
  });

  test("calls deleteTask when delete button is clicked", () => {
    render(<TaskList tasks={tasks} updateTask={mockUpdateTask} deleteTask={mockDeleteTask} />);
    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);
    expect(mockDeleteTask).toHaveBeenCalledWith(0);
  });

  test("calls updateTask when task is marked complete/incomplete", () => {
    render(<TaskList tasks={tasks} updateTask={mockUpdateTask} deleteTask={mockDeleteTask} />);
    const completeButton = screen.getByText("Mark Complete");
    fireEvent.click(completeButton);
    expect(mockUpdateTask).toHaveBeenCalledWith(0, { ...tasks[0], isCompleted: true });
  });

  

  test("exits edit mode without saving changes", () => {
    render(<TaskList tasks={tasks} updateTask={mockUpdateTask} deleteTask={mockDeleteTask} />);

    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockUpdateTask).not.toHaveBeenCalled();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });
});
