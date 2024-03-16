<!-- Create a page which displays the stats from the chrome.storage.local 'stats' array. These stats should be for each day, so filter it -->
<script lang="ts">
	import Extension from '$lib/components/Extension.svelte';
	import { onMount } from 'svelte';

	let focusTime = 0;
	let unFocusTime = 0;

	onMount(async () => {
		let stats = (await chrome.storage.local.get(['stats']))['stats'];

		// stats contain a list of list where the first element is the ISOString and the third element is the relevance
		// Filter for today's date from iso string and count the times the relevance has been greater than 0.55 as productive and less than 0.55 as unproductive
		let today = new Date().toISOString().split('T')[0];
		stats.forEach((stat) => {
			if (stat[0].split('T')[0] === today) {
				if (stat[2] > 0.55) {
					focusTime++;
				} else {
					unFocusTime++;
				}
			}
		});
	});
</script>

<Extension>
	<div class="flex flex-col">
		<p class="text-xl text-center">Statistics</p>
		<p class="text-[1rem]">Total websites visited: {focusTime + unFocusTime}</p>
		<p class="text-[1rem]">Times gone of track: {unFocusTime}</p>
		<p class="text-[1rem]">
			% of productive websites: {(focusTime / (unFocusTime + focusTime)) * 100}
		</p>
	</div>
	<div class="grid grid-cols-3 justify-between gap-x-3 mt-3">
		<a class="btn btn-secondary w-full" href="/options.html">Options</a>
		<a class="btn btn-secondary w-full" href="/memory.html">Memory</a>
		<a class="btn btn-primary w-full" href="/">Back</a>
	</div>
</Extension>
