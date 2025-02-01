import React, { useState } from 'react';
import GenerateInput from './generateInput';
import GenerateOutput from './generateOutput';

function AppContainer() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [setImageState] = useState('waiting');
  
  return (
    <div>
      <GenerateInput setResponse={setResponse} setIsLoading={setIsLoading} isLoading={isLoading} />
      <GenerateOutput response={response} setIsLoading={setIsLoading} setImageState={setImageState} />
    </div>
  );
}

export default AppContainer;