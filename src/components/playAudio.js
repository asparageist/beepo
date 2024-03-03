import React, { useState, useEffect } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio({ response }) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(response);
  }, [response]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateSpeech(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type ="submit">SPEAK</button>
    </form>
  );
}

export default PlayAudio;