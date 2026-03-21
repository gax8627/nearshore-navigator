import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

async function list() {
  try {
    const models = await genAI.listModels();
    for (const m of models.models) {
      console.log(m.name);
    }
  } catch (e: any) {
    console.error('Error listing models:', e.message);
  }
}
list();
