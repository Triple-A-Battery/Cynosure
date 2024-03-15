<script lang="ts">
	import { user } from '$lib/stores';
	import supabase from '$lib/supabase';

	let name = $user === null ? 'User' : $user['name'];

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		user.set(null);
	}
</script>

<nav class="bg-background text-foreground w-full p-4 flex items-center justify-between">
	<div class="text-3xl font-bold">Cynosure</div>

	<div class="flex text-xl gap-4">
		<ul><a href="#">Dashboard</a></ul>
		<ul><a href="#">Feat2</a></ul>
		<ul><button on:click|preventDefault={signOut}>SignOut</button></ul>
	</div>
</nav>
