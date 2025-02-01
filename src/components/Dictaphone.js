import React from 'react';
import getImageUrl from './imageStates';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Dictaphone({ onTranscriptChange, imageState, setIsPressed }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleTouchStart = (e) => {
    e.preventDefault();
    console.log('Touch/Click started'); // Debug log
    setIsPressed(true);
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    console.log('Touch/Click ended'); // Debug log
    setIsPressed(false);
    SpeechRecognition.stopListening();
    onTranscriptChange(transcript);
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  return (
    <div className="wizard-image-container">
      <img
        src={getImageUrl(imageState)}
        alt='wizard listening/waiting'
        className="wizard-image"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        style={{ 
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      />
      {listening && <div style={{color: 'white'}}>Listening...</div>}
    </div>
  );
}

export default Dictaphone;