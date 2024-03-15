<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	import Login from '$lib/components/Login.svelte';
	import Signup from '$lib/components/Signup.svelte';

	import { user } from '$lib/stores';

	let login = true;

	function signUp() {
		login = false;
	}

	function logIn() {
		login = true;
	}
</script>

<main class="bg-background text-foreground">
	<section class="max-w-7xl min-h-[100vh] m-auto flex flex-col">
		<Navbar></Navbar>
		<div class="flex-grow px-4">
			<slot />
		</div>
		<Footer></Footer>
	</section>
</main>

{#if $user === null}
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
{/if}
