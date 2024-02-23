import React from 'react';

function GetInput() {
  return (
    <div>
      <header className='App-header'>
        <p>say what now</p>
      <input 
      type="text"
      name="prompt"
      placeholder="SAY WHAT NOW"
      required />
      </header>
    </div>
  )
}

export default GetInput;