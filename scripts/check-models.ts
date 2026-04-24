
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
  // There is no straightforward listModels in the JS SDK without the rest API
  // But we can try to initialize some common ones and see which one doesn't throw a "not found"
  const models = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-8b-latest",
    "gemini-2.0-flash-lite-001",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash"
  ];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("test");
      console.log(`Model ${modelName}: SUCCESS`);
    } catch (error: any) {
      console.log(`Model ${modelName}: FAILED - ${error.message}`);
    }
  }
}

listModels().catch(console.error);
