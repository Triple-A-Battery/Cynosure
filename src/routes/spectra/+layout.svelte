<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Loading from '$lib/components/Loading.svelte';

	import Login from '$lib/components/Login.svelte';
	import Signup from '$lib/components/Signup.svelte';

	import { user } from '$lib/stores';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';

	let login = true;
	let loading = true;

	function signUp() {
		login = false;
	}

	function logIn() {
		login = true;
	}

	onMount(async () => {
		const { data } = await supabase.auth.getUser();

		if (data.user) {
			let user_data = await supabase.from('Users').select('*').eq('id', data.user.id).single();
			$user = user_data.data;
		}
		loading = false;
	});
</script>

<Loading {loading}>
	{#if !$user.id}
		<div
			class="absolute z-10 bg-foreground bg-opacity-50 backdrop-blur top-0 left-0 w-full h-full flex items-center justify-center"
		>
			<div class="w-full">
				{#if login}
					<Login on:signup={signUp}></Login>
				{:else}
					<Signup on:login={logIn}></Signup>
				{/if}
			</div>
		</div>
	{:else}
		<main class="bg-background text-foreground">
			<section class="w-[80%] bg-background mx-auto m-auto min-h-screen flex flex-col">
				<Navbar></Navbar>
				<div class="flex-grow">
					<slot />
				</div>
				<Footer></Footer>
			</section>
		</main>
	{/if}
</Loading>
