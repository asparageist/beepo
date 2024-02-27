import axios from 'axios';

const API_ENDPOINT = 'https://api.elevenlabs.io/v1/text-to-speech/';

const textToSpeech = async (text, voiceId, apiKey) => {
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        text: text,
        voice_id: voiceId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default textToSpeech;
