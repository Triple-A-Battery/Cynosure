import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { tasks } = await request.json();

	return json(tasks);
}
