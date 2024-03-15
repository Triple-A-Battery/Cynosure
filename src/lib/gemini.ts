import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "$env";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function summarize(content: string) {
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	const result = await model.generateContent(content);
	const response = await result.response;
	const text = response.text();
	return text;
}
