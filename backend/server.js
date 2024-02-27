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

const voiceID = "M4AeDyeasyWLj4pHA0li";

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
      temperature: 0.0 //randomness of the response, 0 being completely deterministic and 1 being random (higher numbers seem to become more long-winded)
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating your text' });
  }
});

app.post('/api/text-to-speech', async (req, res) => {
  const {text} = req.body;
  const apiKey = process.env.XI_API_KEY;
  const API_ENDPOINT = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;

  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json",
              "xi-api-key": apiKey },
    body: JSON.stringify({
      // model_id: "eleven_monolingual_v1",
      text: text,
      // voice_settings: {
      //   similarity_boost: 0.5,
      //   stability: 0.5,
      // }
      redirect: "follow"
    }),
    // URLSearchParams: {
    //   output_format: mp3_44100_128
    // }
  };



  try {
    const response = await fetch(API_ENDPOINT, options);
    console.log('gotted a response!', response)
    // const data = await response.json();
    // res.json({data});
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
    response.body.pipe(res);


  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Error generating speech.'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
