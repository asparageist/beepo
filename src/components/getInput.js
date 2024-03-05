import React, {useState} from 'react';
import callChatGPT from './callGPT';
import Dictaphone from './Dictaphone';


function GetInput({ setResponse, setIsLoading, isLoading, parameters }) {
  const [prompt, setPrompt] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const imageState = isLoading ? 'thinking' : (isPressed ? 'listening' : 'waiting');


  const handleTranscriptChange = (transcript) => {
    setPrompt(transcript);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formattedPrompt = `${parameters} ${prompt}`;
    const apiResponse = await callChatGPT(formattedPrompt);
    setResponse(apiResponse);
    setIsLoading(false);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <p>say what now</p>
      <Dictaphone onTranscriptChange={handleTranscriptChange} imageState={imageState} setIsPressed={setIsPressed} />
      </form>
    </div>
  );
  
}

export default GetInput;