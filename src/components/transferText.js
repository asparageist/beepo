import React, { useState } from 'react';
import GetInput from './getInput';
import PlayAudio from './playAudio';
import InputParameters from './inputParameters';

function TransferText() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState({});

  return (
    <div>
      <InputParameters setParameters={setParameters} />
      <GetInput setResponse={setResponse} setIsLoading={setIsLoading} parameters={parameters} />
      <PlayAudio response={response} isLoading={isLoading} />
    </div>
  );
}

export default TransferText;
