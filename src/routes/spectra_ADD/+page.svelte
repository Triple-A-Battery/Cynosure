<script lang="ts">
	import Extension from '$lib/components/Extension.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';

	let enabled;
	let loading = true;

	async function enableSpectra() {
		let id = crypto.randomUUID();
		const { data, error } = await supabase.from('Users').insert({ id });
		if (error) {
			console.error(error);
		} else {
			enabled = id;
			chrome.storage.local.set({ spectra: id });
		}
	}

	onMount(async () => {
		enabled = (await chrome.storage.local.get(['spectra'])).spectra || undefined;
		loading = false;
	});
</script>

<Extension>
	<Loading {loading}>
		<div class="space-y-3">
			{#if !enabled}
				<button class="btn btn-neutral w-full" on:click={enableSpectra}>Enable Spectra</button>
			{:else}
				<p class="text-xl">Your client ID:</p>
				<p class="text-xl">{enabled}</p>
			{/if}
		</div>
	</Loading>
</Extension>
