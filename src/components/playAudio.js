import React, { useState, useEffect } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio({ response, isLoading, setIsLoading }) {

    useEffect(() => {
      if (response.trim()) {
        setIsLoading(true);
        generateSpeech(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      }
    }, [response, setIsLoading]);

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