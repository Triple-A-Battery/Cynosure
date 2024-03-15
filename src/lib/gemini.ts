import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarize(content: string) {
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	const result = await model.generateContent(content);
	const response = await result.response;
	const text = response.text();
	return text;
}
