import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessName, businessType, campaignGoal, targetAudience, tone } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const prompt = `
You are an expert marketing strategist specializing in the Kerala market.
Generate a 7-day marketing campaign for a business with the following details:
- Business Name: ${businessName}
- Business Type: ${businessType}
- Goal: ${campaignGoal}
- Target Audience: ${targetAudience}
- Tone: ${tone}

CRITICAL: The content MUST be highly tailored to Kerala's culture. Use references to Kerala elements where appropriate (e.g., Onam, monsoon, spices, backwaters, local language nuances, etc.) while keeping the tone ${tone}. Captions must include emojis, relevant hashtags, and a clear Call to Action (CTA). Each day must be unique.

You MUST respond strictly in the following JSON format. Do not use markdown blocks (\`\`\`json) or any surrounding text. Just pure valid JSON.

{
  "calendar": [
    { "day": "Day 1", "platform": "Instagram", "theme": "Theme description", "preview": "Short preview of the post" },
    { "day": "Day 2", "platform": "Facebook", "theme": "Theme description", "preview": "Short preview of the post" }
  ],
  "captions": [
    { "day": "Day 1", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 2", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" }
  ]
}
`;

    let result;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      result = await model.generateContent(prompt);
    } catch (e: any) {
      if (e.message && (e.message.includes("404 Not Found") || e.message.includes("503 Service Unavailable"))) {
        console.warn("gemini-2.5-flash unavailable, falling back to gemini-pro");
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        result = await fallbackModel.generateContent(prompt);
      } else {
        throw e;
      }
    }

    const text = result.response.text();
    
    // Attempt to parse JSON. Sometimes Gemini includes markdown backticks even when instructed not to.
    let parsedData;
    try {
      // Remove markdown formatting if present
      const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON Parsing failed:", parseError, "Raw Output:", text);
      // If parsing fails, return the raw text so the client doesn't just crash silently
      return NextResponse.json({ error: "Failed to parse AI output into JSON format.", rawOutput: text }, { status: 500 });
    }

    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "An error occurred during generation." }, { status: 500 });
  }
}
