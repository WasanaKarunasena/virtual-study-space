// Encouragement.js
import React, { useState, useEffect } from "react";
import './Encouragement.css';
import RandomIcons from './RandomIcons';  // Import the RandomIcons component

const tips = [
  "Believe in yourself! You can do this!",
  "Every small step counts. Keep going!",
  "Stay focused, stay positive.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "You are capable of more than you know.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Strive for progress, not perfection.",
  "Believe you can and you're halfway there.",
];

const Encouragement = () => {
  const [randomTip, setRandomTip] = useState("");

  useEffect(() => {
    generateRandomTip();
  }, []);

  const generateRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setRandomTip(tips[randomIndex]);
  };

  return (
    <div className="encouragement-page">
      <RandomIcons />  {/* Add the random icons to the page */}
      <h2><i className="fas fa-lightbulb"></i> Be The Best Version Of You!!</h2>
      <p className="tip">{randomTip}</p>
      <button onClick={generateRandomTip}>New Tip</button>
    </div>
  );
};

export default Encouragement;
