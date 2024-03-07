import React, { useState, useEffect } from 'react';
import generateSpeech from './api/callElevenLabs';

function GenerateOutput({ response, isLoading, setIsLoading, setImageState }) {

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

  }

export default GenerateOutput;