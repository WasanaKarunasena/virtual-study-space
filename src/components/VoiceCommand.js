import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceCommand = ({ handleCommand }) => {
  const [isListening, setIsListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    handleCommand(transcript);  // Pass the command back to parent component
    resetTranscript(); // Reset transcript after command execution
  };

  return (
    <div className="voice-command-container">
      <button 
        onClick={startListening} 
        disabled={isListening}
        style={{ color: 'black' }} // Inline style to change the font color to black
      >
        {isListening ? 'Listening...' : 'Start Voice Command'}
      </button>
      {isListening && <button onClick={stopListening} style={{ color: 'black' }}>Stop</button>}
      <p>{transcript}</p> {/* Displays spoken text */}
    </div>
  );
};

export default VoiceCommand;
