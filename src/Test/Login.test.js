import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form and description section', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if email and password inputs exist
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByText(/get started/i)).toBeInTheDocument();

    // Check for description text
    expect(screen.getByText(/welcome to your study space/i)).toBeInTheDocument();
    expect(screen.getByText(/this application helps you organize/i)).toBeInTheDocument();
  });

  test('allows users to input email and password', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Select input elements
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);

    // Simulate typing
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert values are updated
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('navigates to the dashboard on successful login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Select input elements
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByText(/get started/i);

    // Simulate typing and form submission
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Verify navigation to the dashboard
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('does not navigate if email or password is missing', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Select input elements
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByText(/get started/i);

    // Submit with empty email
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(mockNavigate).not.toHaveBeenCalled();

    // Submit with empty password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

 
});
