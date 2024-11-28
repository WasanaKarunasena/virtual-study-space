// RandomIcons.js
import React from "react";
import { FaHeart, FaSmile } from "react-icons/fa"; // Import heart and smiley icons
import './RandomIcons.css'; // Create a separate CSS file for styles

const RandomIcons = () => {
  const icons = [];
  
  // Generate random positions and types of icons
  for (let i = 0; i < 10; i++) {
    const iconType = Math.random() > 0.5 ? 'heart' : 'smile'; // Randomly choose heart or smile
    const positionX = Math.random() * 100; // Random X position (percentage)
    const positionY = Math.random() * 100; // Random Y position (percentage)

    icons.push(
      <div
        key={i}
        className={`random-icon ${iconType}`}
        style={{ left: `${positionX}%`, top: `${positionY}%` }}
      >
        {iconType === 'heart' ? <FaHeart /> : <FaSmile />}
      </div>
    );
  }

  return <div className="random-icons-container">{icons}</div>;
};

export default RandomIcons;
