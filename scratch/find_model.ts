
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function findWorkingModel() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
  
  const models = [
    "gemini-1.5-flash-latest",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro-latest"
  ];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("reply with 'OK'");
      const text = result.response.text();
      console.log(`Model ${modelName}: SUCCESS - ${text}`);
      return modelName;
    } catch (error: any) {
      console.log(`Model ${modelName}: FAILED - ${error.message}`);
    }
  }
}

findWorkingModel().then(m => console.log("Best model:", m)).catch(console.error);
