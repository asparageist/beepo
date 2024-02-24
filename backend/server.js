require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
