<script lang="ts">
	import { user } from '$lib/stores';
	import supabase from '$lib/supabase';

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		user.set(null);
	}

	let hoverItem = `hover:bg-foreground hover:bg-opacity-50 hover:text-background transition-all duration-300 w-full p-4 rounded-lg`;
</script>

<nav class="bg-background text-foreground w-full p-4 py-8 flex justify-between">
	<div class="flex justify-center items-center gap-2">
		<img src="/placeholder-logo.png" alt="" class="h-12" />
		<div class="text-4xl font-bold">Cynosure</div>
	</div>

	<button
		on:click|preventDefault={signOut}
		class="bg-foreground text-background p-2 rounded-lg font-semibold hover:bg-opacity-75 transition-all duration-200"
		>Sign out</button
	>
</nav>
