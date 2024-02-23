import OpenAI from 'openai';

const openAI = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY
});

async function callChatGPT(prompt) {
  try {
    const response = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100, //length of the response
      temperature: 0.5 //randomness of the response, 0 being completely deterministic and 1 being random
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default callChatGPT;

