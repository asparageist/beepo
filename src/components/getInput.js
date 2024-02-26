import React, {useState} from 'react';
import callChatGPT from './callGPT';
import Dictaphone from './Dictaphone';


function GetInput() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleTranscriptChange = (transcript) => {
    setPrompt(transcript);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiResponse = await callChatGPT(prompt);
    setResponse(apiResponse);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <p>say what now</p>
      <Dictaphone onTranscriptChange={handleTranscriptChange} />
        <input 
          type="text"
          value={prompt}
          onChange={handleChange}
          placeholder="SAY WHAT NOW"
          required />
        <button type="submit">SAY THAT</button>
      </form>
      {response && <div className="response">{response}</div>}
    </div>
  );
  
}

export default GetInput;