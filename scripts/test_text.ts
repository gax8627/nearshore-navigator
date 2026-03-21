import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Hello',
    });
    console.log('Success:', text);
  } catch (e: any) {
    console.error('Error:', e.message);
  }
}
test();
