import { getEmbedding } from '$lib/embedding';

const memory = {
	name: 'memory',
	description: 'Smart memory',
	feature: async () => {
		console.log(document.title);
		let embed = (await getEmbedding([document.body.innerText]))[0];

		memory.db[`${document.title} [${location.href}]`] = embed;

		chrome.storage.local.set({ memory: memory.db });
	},
	db: {},
	enable: async () => {
		setTimeout(() => {
			memory.feature();
		}, 3000); // Changed to this onload

		memory.db = (await chrome.storage.local.get(['memory']))['memory'] || {};
	}
};

export default memory;
