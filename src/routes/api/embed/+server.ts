import { EmbeddingModel, FlagEmbedding } from "fastembed";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { tasks } = await request.json();

	if (!tasks) return new Response();

	const embeddingModel = await FlagEmbedding.init({
		model: EmbeddingModel.BGESmallENV15
	});

	const embeddings = embeddingModel.embed(tasks);
	let res = [];

	for await (const batch of embeddings) {
		for (const embed of batch) {
			res.push(Object.values(embed));
		}
	}
	return json(res);
}
