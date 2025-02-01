import React from 'react';
import getImageUrl from './imageStates';

function Dictaphone({ onTranscriptChange, imageState, setIsPressed }) {
  return (
    <div className="wizard-image-container">
      <img
        src={getImageUrl(imageState)}
        alt='wizard listening/waiting'
        className="wizard-image"
      />
    </div>
  );
}

export default Dictaphone;