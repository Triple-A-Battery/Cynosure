import { req } from '$lib/helper';
import { PUBLIC_URL } from '$lib/env';

export async function getEmbedding(tasks) {
	return await req(`${PUBLIC_URL}/api/embed`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ tasks })
	});
}

export function cosineSimilarity(embedding1, embedding2) {
	if (embedding1.length !== embedding2.length) {
		throw new Error("Embeddings must have the same length");
	}

	const dotProduct = embedding1.reduce((acc, val, i) => acc + val * embedding2[i], 0);

	const magnitude1 = Math.sqrt(embedding1.reduce((acc, val) => acc + val * val, 0));
	const magnitude2 = Math.sqrt(embedding2.reduce((acc, val) => acc + val * val, 0));

	if (magnitude1 === 0 || magnitude2 === 0) return 0;

	return dotProduct / (magnitude1 * magnitude2);
}
