import { GoogleGenAI } from "@google/genai";

const initGenAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI(apiKey);
};

export const getAIPlanRecommendation = async (userQuery, availablePlans) => {
  const ai = initGenAI();
  if (!ai) {
    return "AI Service is unavailable (Missing API Key). Please browse plans manually.";
  }

  const prompt = `
    You are an expert mobile plan advisor for Mobi-Charge.
    
    Here is the list of available mobile recharge plans:
    ${JSON.stringify(availablePlans)}

    The user is asking: "${userQuery}"

    Based on the available plans, recommend the best plan(s) for the user. 
    Explain why you selected it. Keep the response concise, friendly, and helpful.
    If no plan matches perfectly, suggest the closest alternative.
    Do not invent plans that are not in the list.
  `;

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "I couldn't generate a recommendation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the recommendation engine right now.";
  }
};
