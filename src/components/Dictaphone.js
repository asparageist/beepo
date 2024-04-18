import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import getImageUrl from './imageStates';

const Dictaphone = ({onTranscriptChange, imageState, setIsPressed}) => {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

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

  const imageUrl = getImageUrl(imageState);

  return (
    <div>
      <button
        onTouchStart={handleButtonPress}
        onMouseDown={handleButtonPress}
        onTouchEnd={handleButtonRelease}
        onMouseUp={handleButtonRelease}
      > 
      <img 
        src={imageUrl}
        style={{height: '100vh' }}
        alt='squirrel listening/waiting'
        draggable='false' />
      </button>
    </div>
  );
};
export default Dictaphone;