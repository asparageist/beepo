import React, { useState } from 'react';
import GetInput from './getInput';
import PlayAudio from './playAudio';

function TransferText() {
  const [response, setResponse] = useState('');

  return (
    <div>
      <GetInput setResponse={setResponse} />
      <PlayAudio response={response} />
    </div>
  );
}

export default TransferText;
