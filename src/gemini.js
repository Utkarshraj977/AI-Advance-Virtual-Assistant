let apikey="AIzaSyCEEtXTdT55oqscy87Jp3jHh9RKPAkMksE";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const genAI = new GoogleGenerativeAI(apikey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
  
    return result.response.text();
  }
  
  export default run;
