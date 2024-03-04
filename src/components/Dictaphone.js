import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({onTranscriptChange, isLoading}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  const handleButtonPress = () => {
    setIsPressed(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleButtonRelease = () => {
    setIsPressed(false);
    SpeechRecognition.stopListening();
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  let imageUrl = 'squirrelWaiting.jpg';
  if (isPressed) {
    imageUrl = 'squirrelListening.jpg';
  } else if (isLoading) {
    imageUrl = 'squirrelThinking.jpg';
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        onTouchStart={handleButtonPress}
        onMouseDown={handleButtonPress}
        onTouchEnd={handleButtonRelease}
        onMouseUp={handleButtonRelease}
      > 
      <img 
        src={imageUrl}
        style={{height: '100vh' }}
        alt='squirrel listening/waiting'/>
      </button>
      <br />
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;