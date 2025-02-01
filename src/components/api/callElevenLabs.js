const generateSpeech = async (text) => {
  if (!text) {
    console.error('No text provided for speech generation');
    return null;
  }

  console.log('Attempting to generate speech for:', text);

  try {
    const response = await fetch('/api/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      throw new Error(`Unexpected response ${response.status}`);
    }

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

    audio.src = audioURL;
    console.log('Audio source set');

    return audio;

  } catch (err) {
    console.error('Error in generateSpeech:', err);
    return null;
  }
};

export default generateSpeech;