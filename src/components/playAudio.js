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


    // manual input:
  // useEffect(() => {
  //   setText(response);
  // }, [response]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await generateSpeech(text);
  // };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <textarea value={text} onChange={(e) => setText(e.target.value)} rows="10" cols="80" />
  //     <button type ="submit">SPEAK</button>
  //   </form>
  // );


export default PlayAudio;