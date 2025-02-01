import React, { useState } from 'react';
import callChatGPT from './api/callGPT';
import generateSpeech from './api/callElevenLabs';
import Dictaphone from './Dictaphone';
import InputParameters from './inputParameters';
import ChatHistory from './ChatHistory';
import { useApp } from '../context/AppContext';

function GenerateInput() {
  const [prompt, setPrompt] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasFatalError, setHasFatalError] = useState(false);
  const { 
    setResponse, 
    isLoading, 
    setIsLoading, 
    setError,
    personality,
    restrictions,
    conversationHistory,
    addToHistory
  } = useApp();
  
  const imageState = hasFatalError ? 'error' :
                    isSpeaking ? 'speaking' : 
                    isLoading ? 'thinking' : 
                    isPressed ? 'listening' : 'waiting';

  const handleTranscriptChange = (transcript) => {
    setPrompt(transcript);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt || prompt.trim() === '') {
      setError('Please provide a prompt');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const formattedPrompt = `You are ${personality}. ${restrictions} ${prompt}`;
      console.log('Sending prompt:', formattedPrompt);
      
      const result = await callChatGPT(formattedPrompt, conversationHistory);
      
      if (result.success) {
        addToHistory(prompt, result.data);
        setResponse(`You: ${prompt}\n\nWizard: ${result.data}`);
        
        setIsLoading(false);
        setIsSpeaking(true);
        
        try {
          const audio = await generateSpeech(result.data);
          
          if (audio) {
            audio.addEventListener('ended', () => {
              setIsSpeaking(false);
              console.log('Audio playback completed');
            });
          }
        } catch (error) {
          console.error('Audio playback error:', error);
          setIsSpeaking(false);
          setError('Failed to generate speech');
        }
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Fatal error:', error);
      setHasFatalError(true);
      setError('A fatal error occurred. Please refresh the page.');
      setIsLoading(false);
      setIsSpeaking(false);
    }
  };
  
  React.useEffect(() => {
    const handleError = (error) => {
      console.error('Window error:', error);
      setHasFatalError(true);
      setError('A fatal error occurred. Please refresh the page.');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [setError]);
  
  return (
    <div>
      <InputParameters className="hidden" />
      <form onSubmit={handleSubmit}>
        <Dictaphone 
          onTranscriptChange={handleTranscriptChange} 
          imageState={imageState} 
          setIsPressed={setIsPressed} 
        />
      </form>
      <ChatHistory className={isLoading || isSpeaking ? "visible" : ""} />
    </div>
  );
}

export default GenerateInput;