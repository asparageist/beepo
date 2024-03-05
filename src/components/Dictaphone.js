import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import getImageUrl from './imageShuffle';

const Dictaphone = ({onTranscriptChange, imageState, setIsPressed}) => {
  const {
    transcript,
    listening,
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
        alt='squirrel listening/waiting'
        draggable='false' />
      </button>
      <br />
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;