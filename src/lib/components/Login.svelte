<script lang="ts">
	import supabase from '$lib/supabase';
	import { user } from '$lib/stores';

	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function signUpClicked() {
		dispatch('signup');
	}

	let password = '';
	let email = '';

	async function signIn() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		async function getUserData() {
			const { data, error } = await supabase.from('Users').select().eq('email', email);

			user.set(data[0]);
		}

		await getUserData();
	}
</script>

<section transition:slide>
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={signIn}>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2.5"
							placeholder="cynosure@xyz.com"
							bind:value={email}
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2.5"
							bind:value={password}
						/>
					</div>
					<button
						type="submit"
						class="w-full text-foreground bg-accent hover:bg-background focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
						>Sign in</button
					>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Don’t have an account yet? <button
							on:click|preventDefault={signUpClicked}
							class="font-semibold text-accent hover:underline">Sign up</button
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
