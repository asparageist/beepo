const express = require('express');  
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

let fetch;   
(async () => {
  fetch = (await import('node-fetch')).default;
})();

const app = express();
const voiceID = "BSyOmE6yepUq21Rhxh4S";  // just copy and paste from voice lab on elevenlabs website to change voices
const port = process.env.PORT || 5000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid messages array');
    }

    // Validate each message object
    messages.forEach(msg => {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        throw new Error('Invalid message format');
      }
    });

    console.log('Received messages:', JSON.stringify(messages, null, 2)); // Debug log

    const response = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.0
    });

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Invalid response from OpenAI');
    }

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});


app.post('/api/text-to-speech', async (req, res) => {
  const { text } = req.body;
  const apiKey = process.env.XI_API_KEY;
  const voiceID = "BSyOmE6yepUq21Rhxh4S";  // your voice ID here
  const API_ENDPOINT = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;

  if (!apiKey) {
    console.error('XI_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'ElevenLabs API key is not configured' });
  }

  if (!text) {
    console.error('No text provided in request body');
    return res.status(400).json({ error: 'No text provided' });
  }

  console.log('Attempting text-to-speech conversion:', { text, voiceID });

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    })
  };

  try {
    console.log('Sending request to ElevenLabs...');
    const response = await fetch(API_ENDPOINT, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Error from ElevenLabs API',
        details: errorText
      });
    }

    console.log('Received successful response from ElevenLabs');
    console.log('Response headers:', response.headers);
    
    // Set appropriate headers for audio response
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Accept-Ranges', 'bytes');

    response.body.pipe(res);

  } catch (err) {
    console.error('Error in text-to-speech endpoint:', err);
    res.status(500).json({ 
      error: 'Error generating speech',
      details: err.message
    });
  }
});

app.get('/api/test-elevenlabs', async (req, res) => {
  const apiKey = process.env.XI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'XI_API_KEY not found' });
  }

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.json({ success: true, voices: data });
  } catch (error) {
    console.error('ElevenLabs test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});