
import { GoogleGenAI } from "@google/genai";
import type { Language, PromptInputs } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const createSystemInstruction = (lang: Language): string => {
    if (lang === 'ar') {
        return `
أنت مهندس برومبت خبير لنماذج تحويل النص إلى صور مثل Midjourney أو DALL-E. مهمتك هي أخذ المدخلات المنظمة التالية من المستخدم وإنشاء برومبت واحد متماسك ومفصل باللغة الإنجليزية. يجب أن يكون البرومبت النهائي عبارة عن قائمة من الكلمات الرئيسية والعبارات مفصولة بفواصل، مما يزيد من جودة الصورة والالتزام بطلب المستخدم. كن مبدعًا وأضف تفاصيل وصفية عند الاقتضاء لتحسين الصورة النهائية. يجب أن يكون الناتج هو سلسلة البرومبت النهائية فقط، ولا شيء آخر. لا تقم بتضمين أي نص توضيحي أو مقدمات.
`;
    }
    return `
You are an expert AI prompt engineer for text-to-image models like Midjourney or DALL-E. Your task is to take the following structured user inputs and create a single, cohesive, and highly descriptive prompt in English. The final prompt should be a comma-separated list of keywords and phrases that maximizes image quality and adherence to the user's request. Be creative and add descriptive details where appropriate to enhance the final image. The output should be ONLY the final prompt string, nothing else. Do not include any explanatory text or preambles.
`;
};

const buildUserPrompt = (inputs: PromptInputs): string => {
    return `
User Inputs:
- Main Subject: ${inputs.subject || 'Not specified'}
- Art Style: ${inputs.style || 'Not specified'}
- Color Palette: ${inputs.colors || 'Not specified'}
- Lighting: ${inputs.lighting || 'Not specified'}
- Composition / Framing: ${inputs.composition || 'Not specified'}
- Elements to Avoid (Negative Prompt): ${inputs.negative || 'None'}

Generate the prompt.
`;
};

export const generatePrompt = async (inputs: PromptInputs, lang: Language): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key not configured.");
    }
    
    if (!inputs.subject.trim()) {
        throw new Error(lang === 'ar' ? 'الموضوع الرئيسي مطلوب.' : 'Main Subject is required.');
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: buildUserPrompt(inputs),
            config: {
                systemInstruction: createSystemInstruction(lang),
                temperature: 0.8,
                topP: 0.9,
            }
        });

        const text = response.text.trim();
        
        // Clean up the response to ensure it's just the prompt
        return text.replace(/^(prompt:|output:|here is the prompt:)\s*/i, '').trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error(lang === 'ar' ? 'فشل في إنشاء البرومبت. حاول مرة أخرى.' : 'Failed to generate prompt. Please try again.');
    }
};
