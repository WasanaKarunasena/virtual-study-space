import React, { useState, useEffect, useRef } from "react";
import './Pomodoro.css';

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(1500); // Default 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(25); // Custom time
  const [playMusic, setPlayMusic] = useState(false); // Music toggle
  const [musicFile, setMusicFile] = useState(null); // Selected music file

  const audioRef = useRef(null); // Reference to audio player

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      if (playMusic && musicFile && audioRef.current) {
        audioRef.current.play();
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      if (audioRef.current) audioRef.current.pause();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, playMusic, musicFile]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleStop = () => {
    setIsActive(false);
    setSeconds(inputMinutes * 60);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setInputMinutes(value ? parseInt(value) : 0);
    setSeconds(value * 60);
  };

  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioURL = URL.createObjectURL(file);
      setMusicFile(audioURL);
    }
  };

  return (
    <div className="pomodoro-page">
      <div className="pomodoro-container">
        <div className="title">Pomodoro Timer</div>

        <div className="timer-circle">
          <div className="timer-text">{formatTime(seconds)}</div>
        </div>

        <div className="time-input">
          <label htmlFor="minutes">Set Timer (minutes): </label>
          <input
            type="number"
            id="minutes"
            value={inputMinutes}
            onChange={handleTimeChange}
            min="1"
            max="60"
          />
        </div>

        <div className="music-upload">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="music"
              checked={playMusic}
              onChange={(e) => setPlayMusic(e.target.checked)}
            />
            <span>Play Relaxing Music</span>
          </label>

          {playMusic && (
            <div>
              <label htmlFor="upload">Choose Music: </label>
              <input
                type="file"
                id="upload"
                accept="audio/*"
                onChange={handleMusicUpload}
              />
            </div>
          )}
        </div>

        <div className="button-group">
          <button onClick={handleStart} disabled={isActive}>
            Start
          </button>
          <button onClick={handlePause} disabled={!isActive}>
            Pause
          </button>
          <button onClick={handleStop}>Stop</button>
        </div>

        {musicFile && <audio ref={audioRef} src={musicFile} loop hidden />}
      </div>
    </div>
  );
};

export default Pomodoro;
