<script lang="ts">
	import Extension from '$lib/components/Extension.svelte';
	import { getEmbedding, cosineSimilarity } from '$lib/embedding';
	import { onMount } from 'svelte';

	import * as timsort from 'timsort';

	let results = [];

	let db = {};
	let entries = [];

	async function search(e) {
		let queryEmbed = (await getEmbedding([e.target.value]))[0];
		results = [];

		for (const entry of entries) {
			console.log(queryEmbed, entry[1]);
			results.push({
				text: entry[0],
				similarity: cosineSimilarity(queryEmbed, entry[1])
			});
		}

		timsort.sort(results, (a, b) => b.similarity - a.similarity);

		results = results.slice(0, 5);
	}

	onMount(async () => {
		db = (await chrome.storage.local.get(['memory']))['memory'];
		entries = Object.entries(db);
	});
</script>

<Extension>
	<input type="text" on:input={search} class="input input-bordered w-full mb-3" />
	{#each results as result}
		<div class="flex flex-row justify-between">
			<a style="margin-right: 20px" href={result.text.match(/https?:\/\/[^\s\]]+/)[0]}
				>{result.text.replace(/https?:\/\/[^\s\]]+/, '')}</a
			>
			<p>{Math.round(result.similarity * 100)}%</p>
		</div>
	{/each}
</Extension>
