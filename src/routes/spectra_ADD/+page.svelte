<script lang="ts">
	import Extension from '$lib/components/Extension.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';

	let enabled;
	let loading = true;

	async function enableSpectra(e) {
		let formData = new FormData(e.target);
		let id = crypto.randomUUID();
		const { data, error } = await supabase.from('Users').insert({ id, name: formData.get('name') });
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
				<form on:submit|preventDefault={enableSpectra}>
					<input placeholder="Name" class="input input-bordered w-full mb-3" name="name" />
					<input value="Enable Spectra" class="btn btn-neutral w-full" type="submit" />
				</form>
			{:else}
				<p class="text-xl">Your client ID:</p>
				<p class="text-xl">{enabled}</p>
			{/if}
		</div>

		<a class="btn btn-primary w-full" href="/">Back</a>
	</Loading>
</Extension>
