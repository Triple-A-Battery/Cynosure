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
	<input
		type="text"
		placeholder="Search"
		on:input={search}
		class="input input-bordered w-full mb-3"
	/>
	{#each results as result}
		<div class="flex flex-row justify-between">
			<a
				style="margin-right: 20px"
				class="text-lg"
				href={result.text.match(/https?:\/\/[^\s\]]+/)[0]}
				>{result.text.replace(/\[https?:\/\/[^\s\]]+\]/, '')}</a
			>
			<p class="text-lg">{Math.round(result.similarity * 100)}%</p>

			<!-- <a style="margin-right: 20px" }>{result.text.replace(/https?:\/\/[^\s\]]+/, '')}</a> -->
			<!-- <p>{Math.round(result.similarity * 100)}%</p> -->
		</div>
	{/each}
	<div class="grid grid-cols-3 justify-between gap-x-3 mt-3">
		<a class="btn btn-secondary w-full" href="/options.html">Options</a>
		<a class="btn btn-primary w-full" href="/">Back</a>
		<a class="btn btn-secondary w-full" href="/stats.html">Statistics</a>
	</div>
</Extension>
