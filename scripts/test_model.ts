import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
    try {
        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: 'Say hello',
        });
        console.log('Success:', text);
    } catch (e: any) {
        console.error('Failed with gemini-1.5-flash:', e.message);
        try {
            const { text } = await generateText({
                model: google('gemini-1.5-flash-latest'),
                prompt: 'Say hello',
            });
            console.log('Success with gemini-1.5-flash-latest:', text);
        } catch (e2: any) {
            console.error('Failed with gemini-1.5-flash-latest:', e2.message);
        }
    }
}
test();
