import { cosineSimilarity, getEmbedding } from "$lib/embedding";
import { get } from "$lib/storage";

import { injectComponent } from "$lib/helper";

const memory = {
	name: "memory",
	description: "Index all websites you visited using Smart memory",
	feature: async () => {
		console.log(document.title)
		let embed = (await getEmbedding([document.body.innerText]))[0];

		memory.db[`${document.title} [${location.href}]`] = embed;

		chrome.storage.local.set({ memory: memory.db });
	},
	db: {},
	enable: async () => {

		setTimeout(() => {
			memory.feature();
		}, 3000); // Changed to this onload

		memory.db = (await chrome.storage.local.get(["memory"]))["memory"] || {};
	},
	popupID: "cynosure-memoryPopup",
	popupHTML: (relevance: Number) => {
		return `
<p>The current content matches ${relevance}% with your task.</p>
<p>You might want to get back on track!</p>
		`;
	}
};

export default memory;
