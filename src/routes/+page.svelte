<script lang="ts">
	import { onMount } from 'svelte';
	import { set, get } from '$lib/storage';
	// import { getEmbedding } from '$lib/embedding';
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
		<div class="flex flex-row justify-between">
			<a class="btn btn-primary" href="/options.html">Options</a>
			<button on:click={save} class="btn btn-neutral">NOW</button>
			<a class="btn btn-secondary" href="/memory.html">Memory</a>
		</div>
	</div>
</Extension>

<style lang="postcss">
	btn {
		height: 2rem;
		min-height: 2rem;
	}
</style>
