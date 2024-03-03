import React, { useState, useEffect } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio({ response }) {
  const [text, setText] = useState('');

    useEffect(() => {
      if (response.trim()) {
        generateSpeech(response);
      }
    }, [response]);

    return (
      <div>
        <textarea value={response} readOnly rows="10" cols="80" />
      </div>
      );
    }

export default PlayAudio;