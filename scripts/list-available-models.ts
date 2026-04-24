import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import axios from 'axios';

dotenv.config({ path: ".env.local" });

async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
  }
}

listModels();
