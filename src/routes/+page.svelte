<script lang="ts">
	import { onMount } from 'svelte';
	import { set, get } from '$lib/storage';
	import { getEmbedding } from '$lib/embedding';

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

<p>I am going to focus on:</p>
<input placeholder="Programming" bind:value={task} />
<button on:click={save}>now</button>
