import React, { useRef } from 'react';
import './App.css';

function App() {
  const soundEffect = useRef(new Audio(process.env.PUBLIC_URL + '/hum.mp3'));

  const playSound = () => {
    soundEffect.current.play();
  };

  const stopSound = () => {
    soundEffect.current.pause();
    soundEffect.current.currentTime = 0;
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={playSound}>PLAY</button>
        <button onClick={stopSound}>STOP</button>
      </header>
    </div>
  );
}

export default App;
