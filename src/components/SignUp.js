// SignUp.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (name && email && password) {
      alert('Account created successfully!');
      navigate('/dashboard'); // Redirect to the dashboard after sign-up
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-page">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="login-option">
          <p>Already have an account? <Link to="/">Log in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
