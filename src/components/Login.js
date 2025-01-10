// Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import backgroundImage from '../assets/images/login-bg.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/dashboard'); // Redirect to dashboard after login
    }
  };

  return (
    <div className="login-container">
      {/* Background Image Section */}
      <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password" 
            />
          </div>
          <button type="submit" className="login-button">Get Started</button>
        </form>

        {/* Sign-Up Link */}
        <div className="signup-option">
          <p>No account? <Link to="/signup">Sign up here</Link></p> 
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <header className="welcome-navbar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </nav>
        </header>

        <h2>Welcome to Your Study Space</h2>
        <p>
          This application helps you organize your study schedule, manage tasks,
          and stay motivated. Use the Pomodoro technique for effective studying,
          and get encouragement whenever you need it.
        </p>
        <p>
          Track your progress with our intuitive calendar and task management system.
          Stay on top of your goals and maximize your productivity!
        </p>
      </div>
    </div>
  );
};

export default Login;