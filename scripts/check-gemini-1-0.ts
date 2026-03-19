
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function checkModel() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
  const modelName = "gemini-1.0-pro";
  
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("test");
    console.log(`Model ${modelName}: SUCCESS`);
  } catch (error: any) {
    console.log(`Model ${modelName}: FAILED - ${error.message}`);
  }
}

checkModel().catch(console.error);
