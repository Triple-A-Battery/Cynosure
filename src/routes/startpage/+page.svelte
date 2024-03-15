<script lang="ts">
	import List from '$lib/components/List.svelte';
</script>

<div class="max-w-2xl h-screen m-auto">
	<div class="flex flex-col w-full justify-center h-full">
		<div class="w-full mb-10">
			<input type="text" placeholder="Search" class="input input-bordered w-full" />
		</div>
		<div class="flex flex-row justify-between space-x-6">
			<List />
			<List />
			<List />
		</div>
	</div>
</div>
