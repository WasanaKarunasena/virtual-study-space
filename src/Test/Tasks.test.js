import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tasks from "./Tasks";

describe("Tasks Component", () => {
  const mockAddTask = jest.fn();

  test("renders form and default subjects", () => {
    render(<Tasks addTask={mockAddTask} />);
    expect(screen.getByRole("heading", { name: /Add Task/i })).toBeInTheDocument();
    expect(screen.getByText(/Select Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Math/i)).toBeInTheDocument();
  });

  test("adds a new subject", () => {
    render(<Tasks addTask={mockAddTask} />);
    const input = screen.getByPlaceholderText(/New Subject/i);
    fireEvent.change(input, { target: { value: "History" } });
    fireEvent.click(screen.getByText(/\+ Add Subject/i));
    expect(screen.getByText(/History/i)).toBeInTheDocument();
  });

  test("prevents adding duplicate subjects", () => {
    render(<Tasks addTask={mockAddTask} />);
    const input = screen.getByPlaceholderText(/New Subject/i);
    fireEvent.change(input, { target: { value: "Math" } });
    fireEvent.click(screen.getByText(/\+ Add Subject/i));
    expect(screen.getAllByText(/Math/i).length).toBe(1);
  });

  

  
});
