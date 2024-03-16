<script lang="ts">
	export let loading: boolean;

	import { slide } from 'svelte/transition';
</script>

{#if loading}
	<div
		class="flex flex-col gap-4 absolute top-0 w-screen h-screen bg-white justify-center items-center z-[100]"
		transition:slide
	>
		<div class="max-w-md">
			<div class="flex items-center gap-4 mb-3">
				<div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
				<div class="flex flex-col gap-4">
					<div class="skeleton h-4 w-20"></div>
					<div class="skeleton h-4 w-28"></div>
				</div>
			</div>
			<div class="skeleton h-32 w-full"></div>
		</div>
	</div>
{:else}
	<slot />
{/if}
