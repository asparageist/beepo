import React, {useState} from 'react';
import callChatGPT from './api/callGPT';
import Dictaphone from './Dictaphone';
import InputParameters from './inputParameters';


function GenerateInput({ setResponse, setIsLoading, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [parameters, setParameters] = useState({});
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
      <InputParameters setParameters={setParameters} />
      <form onSubmit={handleSubmit}>
        <Dictaphone onTranscriptChange={handleTranscriptChange} imageState={imageState} setIsPressed={setIsPressed} />
      </form>
    </div>
  );
  
}

export default GenerateInput;