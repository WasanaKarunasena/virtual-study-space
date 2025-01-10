import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import TaskCalendar from "./Calendar";

jest.mock("react-toastify", () => ({
  toast: {
    info: jest.fn(),
  },
}));

describe("TaskCalendar Component", () => {
  const mockTasks = [
    {
      name: "Math Assignment",
      taskType: "Assignment",
      subject: "Math",
      date: new Date().toISOString(), // Today's date
    },
    {
      name: "Biology Revision",
      taskType: "Revision",
      subject: "Biology",
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow's date
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders calendar and tasks", () => {
    render(<TaskCalendar tasks={mockTasks} />);
    expect(screen.getByText(/Task Calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/Math Assignment \(Assignment\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Biology Revision \(Revision\)/i)).toBeInTheDocument();
  });

  test("shows toast notification for today's tasks", () => {
    render(<TaskCalendar tasks={mockTasks} />);
    expect(toast.info).toHaveBeenCalledWith(
      expect.stringContaining("Reminder: Task \"Math Assignment\" is due today!"),
      expect.objectContaining({ position: "top-right", autoClose: 5000 })
    );
  });



  test("closes popup on button click", () => {
    render(<TaskCalendar tasks={mockTasks} />);
    const taskEvent = screen.getByText(/Math Assignment \(Assignment\)/i);

    fireEvent.click(taskEvent);
    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Task Details/i)).not.toBeInTheDocument();
  });
});
