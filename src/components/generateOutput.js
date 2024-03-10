import { useEffect } from 'react';
import generateSpeech from './api/callElevenLabs';

function GenerateOutput({ response, setIsLoading, setImageState }) {

    useEffect(() => {
      if (response.trim()) {
        setIsLoading(true);
        generateSpeech(response).then(() => {
          setTimeout(() => {
            setIsLoading(false);
        }, 4000);
      });
      }
    }, [response, setIsLoading, setImageState]);

  }

export default GenerateOutput;