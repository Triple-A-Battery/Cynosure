import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
});

export async function summarize(text: string) {
	const chatCompletion = await openai.chat.completions.create({
		messages: [{
			role: 'user', content: `Summarize the following video, do not add any headings, just output the summary in one SINGLE paragraph.
The video:

${text}
		` }],
		model: 'gpt-3.5-turbo',
	});

	return chatCompletion.choices[0].message.content;
}

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GEMINI_API_KEY } from "$env";
//
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
//
// export async function summarize(content: string) {
// 	const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//
// 	const result = await model.generateContent(content);
// 	const response = await result.response;
// 	const text = response.text();
// 	return text;
// }
