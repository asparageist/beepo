import React, { useState, useEffect } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio({ response, isLoading, setIsLoading, setImageState }) {

    useEffect(() => {
      if (response.trim()) {
        setIsLoading(true);
        // setImageState('thinking');
        generateSpeech(response).then(() => {
          // setImageState('speaking');
          setTimeout(() => {
            setIsLoading(false);
            // setImageState('waiting');
        }, 4000);
      });
      }
    }, [response, setIsLoading, setImageState]);

    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <p>{response}</p>
        )}  
        </div>
      );
    }

export default PlayAudio;