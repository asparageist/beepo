import React, { useState, useEffect } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio({ response, isLoading }) {
  const [isAudioLoading, setIsAudioLoading] = useState(false);

    useEffect(() => {
      if (response.trim()) {
        setIsAudioLoading(true);
        generateSpeech(response);
        setTimeout(() => {
          setIsAudioLoading(false);
        }, 4000);
      }
    }, [response]);

    return (
      <div>
        {(isLoading || isAudioLoading) ? (
          <div>Loading...</div>
        ) : (
          <textarea value={response} readOnly rows="10" cols="80" />
        )}  
        </div>
      );
    }

export default PlayAudio;