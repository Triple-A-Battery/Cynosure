<script lang="ts">
	import { user } from '$lib/stores';

	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

	let name: string;
	let code: string;

	let organizations = [];

	onMount(async () => {
		let { data, error } = await supabase
			.from('UserOrganizationRelations')
			.select()
			.eq('user_id', $user['id']);

		if (data !== null) {
			for (let i = 0; i < data.length; i++) {
				let org_data = await supabase
					.from('Organizations')
					.select()
					.eq('id', data[i]['org_id'])
					.single();

				organizations = [
					...organizations,
					{ name: org_data['data']['name'], id: data[i]['org_id'] }
				];
				console.log(org_data['data']['name']);
			}
		}
	});

	const joinOrg = async () => {
		let { data, error } = await supabase
			.from('Organizations')
			.insert([{ name: name }])
			.select();

		if (error) {
			console.error(error);
		}

		return { data, error };
	};

	const createOrg = async () => {
		let { data, error } = await supabase
			.from('Organizations')
			.insert([{ name: name }])
			.select()
			.single();

		if (error) {
			console.error(error);
		} else {
			let exec = await supabase
				.from('UserOrganizationRelations')
				.insert({ user_id: $user['id'], org_id: data['id'] });

			$user = { ...$user, sessionOrgId: data['id'] };

			organizations = [...organizations, { name: org_data['data']['name'], id: data[i]['org_id'] }];
		}

		return { data, error };
	};
</script>

<section class="flex flex-col p-4 w-full">
	<h1 class="text-2xl mb-4">Hey! Welcome to your organization view</h1>
	<div class="flex gap-4 h-80 w-[80%] justify-around mx-auto p-4">
		<div class="bg-foreground bg-opacity-5 p-4 w-72 flex flex-col items-center rounded-xl">
			<span class="text-2xl font-semibold">Create</span>
			<form on:submit|preventDefault={createOrg}>
				<div class="flex flex-col flex-grow h-full">
					<label for="name" class="text-xl">name</label>
					<input
						type="text"
						name="name"
						id="name"
						class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2.5"
						placeholder="cynosure"
						bind:value={name}
					/>
				</div>
				<div class="flex items-center justify-center">
					<button class="bg-foreground text-background p-4 rounded-lg" type="submit">
						<span>submit</span>
					</button>
				</div>
			</form>
		</div>

		<div class="bg-foreground bg-opacity-5 p-4 w-72 flex flex-col items-center rounded-xl">
			<span class="text-2xl font-semibold">Join</span>
			<form on:submit={joinOrg}>
				<div class="flex flex-col flex-grow h-full">
					<label for="name" class="text-xl">code</label>
					<input
						type="text"
						name="name"
						id="name"
						class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2.5"
						placeholder="xxx-yyy-zzz"
						bind:value={code}
					/>
				</div>
				<div class="flex items-center justify-center">
					<button class="bg-foreground text-background p-4 rounded-lg" type="submit">
						<span>submit</span>
					</button>
				</div>
			</form>
		</div>
	</div>

	<div class="text-2xl my-4 font-semibold">Joined Organizations</div>
	{#if organizations.length !== 0}
		<div class="min-w-[95%] mx-auto flex flex-col gap-4">
			{#each organizations as org}
				<div class="collapse collapse-open bg-foreground text-foreground bg-opacity-100">
					<input type="radio" name="my-accordion-2" />
					<div class="collapse-title text-xl font-medium flex justify-between items-center">
						<div class="text-background font-semibold">{org['name']}</div>
					</div>
					<div class="collapse-content ml-auto">
						<div class="bg-accent text-foreground p-2 rounded-lg">
							Code: {org['id']}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div>You arent part of any organizations currently</div>
	{/if}
</section>
