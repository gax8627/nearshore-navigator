import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function translate() {
    const enPath = path.join(process.cwd(), "app/i18n/locales/en.json");
    const esPath = path.join(process.cwd(), "app/i18n/locales/es.json");

    const enJson = JSON.parse(fs.readFileSync(enPath, "utf-8"));
    
    console.log("Starting translation...");

    const prompt = `
You are an expert English to Spanish translator specializing in professional B2B Mexican Spanish, specifically for the industrial real estate and manufacturing sectors in Baja California. 

Translate the following JSON object to Spanish. 
CRITICAL INSTRUCTIONS:
- Do not use literal translations like Google Translate. Make it sound natural and authoritative.
- Use Mexican business terminology (e.g., "bienes raíces industriales", "maquiladoras", "manufactura por contrato", "naves industriales", "operaciones", "parques industriales", "aranceles").
- Avoid words like "emparejamiento" (use "conexiones estratégicas" or "enlace comercial").
- Avoid "Hoja de ruta" (use "Guía", "Plan de Acción", or "Estrategia").
- Do not change the JSON keys. Only translate the values.
- Return ONLY valid JSON, no markdown formatting or backticks around it.

JSON to translate:
${JSON.stringify(enJson, null, 2)}
`;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        
        // Remove markdown formatting if present
        if (text.startsWith("\`\`\`json")) {
            text = text.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
        } else if (text.startsWith("\`\`\`")) {
            text = text.replace(/^\`\`\`\n/, "").replace(/\n\`\`\`$/, "");
        }

        const translatedJson = JSON.parse(text);
        
        fs.writeFileSync(esPath, JSON.stringify(translatedJson, null, 4));
        console.log("Translation complete! Saved to es.json");
    } catch (error) {
        console.error("Error during translation:", error);
    }
}

translate();
