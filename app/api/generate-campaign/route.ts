/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Models confirmed available via ListModels API call
const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-flash-latest",
];

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
    { "day": "Day 2", "platform": "Facebook", "theme": "Theme description", "preview": "Short preview of the post" },
    { "day": "Day 3", "platform": "WhatsApp", "theme": "Theme description", "preview": "Short preview of the post" },
    { "day": "Day 4", "platform": "Instagram", "theme": "Theme description", "preview": "Short preview of the post" },
    { "day": "Day 5", "platform": "Facebook", "theme": "Theme description", "preview": "Short preview of the post" },
    { "day": "Day 6", "platform": "WhatsApp", "theme": "Theme description", "preview": "Short preview of the post" },
    { "day": "Day 7", "platform": "Instagram", "theme": "Theme description", "preview": "Short preview of the post" }
  ],
  "captions": [
    { "day": "Day 1", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 2", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 3", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 4", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 5", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 6", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" },
    { "day": "Day 7", "caption": "The full engaging caption with emojis, #hashtags, and CTA", "imagePrompt": "A detailed prompt to generate an image for this post" }
  ]
}
`;

    let result: any = null;
    let lastError: any = null;

    // Try each model in order until one works
    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        console.log(`Success with model: ${modelName}`);
        break;
      } catch (e: any) {
        console.warn(`Model ${modelName} failed: ${e.message}`);
        lastError = e;
      }
    }

    if (!result) {
      return NextResponse.json(
        { error: `All AI models failed. Last error: ${lastError?.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    const text = result.response.text();

    // Robust JSON extraction — find first { and last }
    let parsedData;
    try {
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start === -1 || end === -1) throw new Error("No JSON object found in AI response");
      parsedData = JSON.parse(text.substring(start, end + 1));
    } catch (parseError) {
      console.error("JSON Parsing failed. Raw output:", text);
      return NextResponse.json(
        { error: "The AI response was not in valid JSON format. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during generation." },
      { status: 500 }
    );
  }
}
