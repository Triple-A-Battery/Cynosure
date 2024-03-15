<script lang="ts">
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

		timsort.sort(results, (a, b) => b - a);
	}

	onMount(async () => {
		db = (await chrome.storage.local.get(['memory']))['memory'];
		entries = Object.entries(db);
	});
</script>

<input type="text" on:input={search} />

{#each results as result}
	<div style="display: flex;">
		<p style="margin-right: 20px">{result.text}</p>
		<p>{result.similarity}%</p>
	</div>
{/each}
