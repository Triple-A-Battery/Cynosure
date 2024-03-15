<script lang="ts">
	import { onMount } from 'svelte';
	import { features } from '$extension/features';
	import Extension from '$lib/components/Extension.svelte';

	let form: HTMLFormElement;
	let config: Record<string, any> = {};

	function saveConfig(e: Event) {
		config[e.target.name] = e.target.checked;
		chrome.storage.local.set({ config });
	}

	onMount(async () => {
		config = (await chrome.storage.local.get(['config']))['config'];

		if (!config) {
			config = {};
			for (const feature of features) {
				config[feature.name] = true;
			}
			await chrome.storage.local.set({ config });
		}

		for (const [key, value] of Object.entries(config)) {
			const field = form.elements.namedItem(key);
			field && (field.checked = value);
		}
	});
</script>

<Extension>
	<form id="settingsForm" on:change={saveConfig} bind:this={form}>
		{#each features as feature}
			<label for={feature.name}>{feature.description}</label>
			<input type="checkbox" id={feature.name} name={feature.name} />
			<br />
		{/each}
	</form>
</Extension>
