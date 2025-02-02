const generateSpeech = async (text) => {
  if (!text) {
    console.error('No text provided for speech generation');
    return null;
  }

  console.log('Attempting to generate speech for:', text);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  };

  try {
    console.log('Sending request to text-to-speech endpoint...');
    const response = await fetch('/api/text-to-speech', options);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Text-to-speech response error:', response.status, errorText);
      throw new Error(`Unexpected response ${response.status}: ${errorText}`);
    }

    console.log('Response headers:', [...response.headers.entries()]);
    console.log('Response type:', response.type);
    
    const blob = await response.blob();
    console.log('Blob created:', {
      type: blob.type,
      size: blob.size,
      isBlob: blob instanceof Blob
    });

    if (blob.size === 0) {
      throw new Error('Received empty blob from server');
    }

    const audioURL = URL.createObjectURL(blob);
    console.log('Audio URL created:', audioURL);

    const audio = new Audio();
    
    // Add event listeners before setting the source
    audio.addEventListener('loadeddata', () => {
      console.log('Audio data loaded successfully');
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('Audio can play through');
      audio.play()
        .then(() => console.log('Audio playback started'))
        .catch(error => console.error('Play failed:', error));
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      console.error('Audio error details:', audio.error);
    });

    audio.addEventListener('ended', () => {
      console.log('Audio playback completed');
      URL.revokeObjectURL(audioURL);
    });

    // Set the audio source
    audio.src = audioURL;
    console.log('Audio source set');

    return audio;  // Return the audio element

  } catch (err) {
    console.error('Error in generateSpeech:', err);
    return null;
  }
};

export default generateSpeech;