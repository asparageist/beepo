import {config} from 'dotenv';
import {configuration, OpenAIApi} from 'openai';
config()


const axios = require('axios');
const openAI = new OpenAIApi(new configuration({
  apiKey: process.env.API_KEY
}))
