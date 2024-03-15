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
	<p class="text-xl">Stats</p>
	<p>Total websites visited: {focusTime + unFocusTime}</p>
	<p>Times gone of track: {unFocusTime}</p>
	<p>% of productive websites: {(focusTime / (unFocusTime + focusTime)) * 100}</p>
</Extension>
