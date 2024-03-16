<script lang="ts">
	import { onMount } from 'svelte';
	import { set, get } from '$lib/storage';
	import { getEmbedding } from '$lib/embedding';
	import Extension from '$lib/components/Extension.svelte';

	let task: string;

	async function save() {
		let embedding = (await getEmbedding([task]))[0];
		set('task', task);
		set('taskEmbedding', embedding);
	}

	onMount(async () => {
		chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
		task = await get('task');
	});
</script>

<Extension>
	<div class="space-y-3">
		<p class="text-xl">I am going to focus on:</p>
		<input placeholder="Programming" class="input input-bordered w-full" bind:value={task} />
		<button on:click={save} class="btn btn-primary w-full">NOW</button>
		<div class="grid grid-cols-3 justify-between gap-x-3">
			<a class="btn btn-secondary w-full" href="/options.html">Options</a>
			<a class="btn btn-secondary w-full" href="/memory.html">Memory</a>
			<a class="btn btn-secondary w-full" href="/stats.html">Statistics</a>
		</div>
		<a class="btn btn-secondary w-full" href="/spectra_ADD.html">Spectra</a>
	</div>
</Extension>

<style lang="postcss">
	btn {
		height: 2rem;
		min-height: 2rem;
	}
</style>
