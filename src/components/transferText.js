import React, { useState } from 'react';
import GetInput from './getInput';
import PlayAudio from './playAudio';

function TransferText() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <GetInput setResponse={setResponse} setIsLoading={setIsLoading} />
      <PlayAudio response={response} isLoading={isLoading} />
    </div>
  );
}

export default TransferText;
