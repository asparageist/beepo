const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

let fetch;   //dynamic import() statement to load 'node-fetch' as an ES module
(async () => {
  fetch = (await import('node-fetch')).default;
})();

const app = express();
app.use(cors());

const voiceID = "560045d6fea2053471c18d5050e96c9e4bdd8ff379185fea0638c01b59e316be";

const port = process.env.PORT || 5000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: prompt},
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 100, //length of the response
      temperature: 0.5 //randomness of the response, 0 being completely deterministic and 1 being random
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating your text' });
  }
});

app.post('/api/text-to-speech', async (req, res) => {
  const {text} = req.body;

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model_id: "eleven_monolingual_v1",
      text: text,
      voice_settings: {
        similarity_boost: 123,
        stability: 123,
        style: 123,
        use_speaker_boost: true
      }
    })
  };

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`, options);
    const data = await response.json();
    res.json({audio_url: data.audio_url});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Error generating speech.'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
