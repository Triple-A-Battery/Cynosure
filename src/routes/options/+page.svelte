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
	<form class="text-lg flex flex-col" id="settingsForm" on:change={saveConfig} bind:this={form}>
		{#each features as feature}
			<div class="flex flex-row space-x-3">
				<input
					type="checkbox"
					class="p-2 accent-blue align-middle"
					id={feature.name}
					name={feature.name}
				/>
				<label for={feature.name} class="align-middle">{feature.description}</label>
			</div>
		{/each}
	</form>
	<div class="grid grid-cols-2 justify-between gap-x-3 mt-3">
		<a class="btn btn-primary w-full" href="/">Back</a>
		<a class="btn btn-secondary w-full" href="/memory.html">Memory</a>
	</div>
</Extension>

<style lang="postcss">
	btn {
		height: 2rem;
		min-height: 2rem;
	}
</style>
