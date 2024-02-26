import React from 'react';
import './App.css';
import PlayAudio from './playAudio';
import GetInput from './getInput';

function App() {
  return (
    <>
    <div id='App-header'>
      <GetInput/>
      <PlayAudio/>
    </div>
    </>
  );
}

export default App;
