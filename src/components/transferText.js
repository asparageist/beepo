import React, { useState } from 'react';
import GetInput from './getInput';
import PlayAudio from './playAudio';
import InputParameters from './inputParameters';

function TransferText() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageState, setImageState] = useState('waiting');
  const [parameters, setParameters] = useState({});

  return (
    <div>
      <InputParameters setParameters={setParameters} />
      <GetInput setResponse={setResponse} setIsLoading={setIsLoading} isLoading={isLoading} parameters={parameters} />
      <PlayAudio response={response} isLoading={isLoading} setIsLoading={setIsLoading} setImageState={setImageState} />
    </div>
  );
}

export default TransferText;