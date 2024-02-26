import React, { useState, useRef } from 'react';
import generateSpeech from './generateSpeech';

function PlayAudio() {
  const [text, setText] = useState('');

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

// function PlayAudio() {
//   const soundEffect = useRef(new Audio(process.env.PUBLIC_URL + '/hum.mp3'));

//   const playSound = () => {
//     soundEffect.current.play();
//   };

//   const stopSound = () => {
//     soundEffect.current.pause();
//     soundEffect.current.currentTime = 0;
//   };

//   return (
//     <div>
//       <header>
//         <button onClick={playSound}>PLAY</button>
//         <button onClick={stopSound}>STOP</button>
//       </header>
//     </div>
//   );
// }

export default PlayAudio;