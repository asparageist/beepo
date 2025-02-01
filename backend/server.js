const express = require('express');  
const { OpenAI } = require('openai');
const cors = require('cors');
const path = require('path');
const envPath = path.resolve(__dirname, '../.env');  // This will now look one level up from backend
console.log('Looking for .env at:', envPath);

require('dotenv').config({ path: envPath });

// Print all environment variables (be careful not to commit this!)
console.log('All environment variables:', process.env);

// Print specific checks
console.log('Current directory:', __dirname);
console.log('Parent directory:', path.resolve(__dirname, '..'));
console.log('OpenAI Key:', process.env.OPENAI_API_KEY ? 'exists' : 'missing');
console.log('XI Key:', process.env.XI_API_KEY ? 'exists' : 'missing');

let fetch;   
(async () => {
  fetch = (await import('node-fetch')).default;
})();

const app = express();
const voiceID = "wDJ3bUPmyY8h3FIcZStV";  // just copy and paste from voice lab on elevenlabs website to change voices
const port = process.env.PORT || 3000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Trust the Railway proxy
app.set('trust proxy', true);

// Update CORS configuration with exact domain
app.use(cors());

// Add headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://beepo-production.up.railway.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));

// Add this line for debugging
console.log('OpenAI Key exists:', !!process.env.OPENAI_API_KEY);
console.log('ElevenLabs Key exists:', !!process.env.XI_API_KEY);

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, conversationHistory } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        ...conversationHistory.map(entry => ({
          role: "user",
          content: entry.userMessage
        })),
        { role: "user", content: prompt }
      ],
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.post('/api/text-to-speech', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const voiceID = "wDJ3bUPmyY8h3FIcZStV";  // Your voice ID
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.XI_API_KEY
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      return res.status(response.status).send(errorText);
    }

    const audioBuffer = await response.arrayBuffer();
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('Text-to-speech error:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
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

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});