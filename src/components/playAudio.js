import React, { useState, useEffect } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio({ response, isLoading, setIsLoading, setImageState }) {

    useEffect(() => {
      if (response.trim()) {
        setIsLoading(true);
        setImageState('thinking');
        generateSpeech(response).then(() => {
          setImageState('speaking');
          setTimeout(() => {
            setIsLoading(false);
            setImageState('waiting');
        }, 4000);
      });
      }
    }, [response, setIsLoading, setImageState]);

    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <textarea value={response} readOnly rows="10" cols="80" />
        )}  
        </div>
      );
    }

export default PlayAudio;