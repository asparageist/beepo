import React, {useState} from 'react';
import callChatGPT from './callGPT';
import Dictaphone from './Dictaphone';


function GetInput({ setResponse, setIsLoading, parameters }) {
  const [prompt, setPrompt] = useState('');

  const handleTranscriptChange = (transcript) => {
    setPrompt(transcript);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formattedPrompt = `${prompt} ${parameters}`;
    const apiResponse = await callChatGPT(formattedPrompt);
    setResponse(apiResponse);
    setIsLoading(false);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <p>say what now</p>
      <Dictaphone onTranscriptChange={handleTranscriptChange} />
      </form>
    </div>
  );
  
}

export default GetInput;