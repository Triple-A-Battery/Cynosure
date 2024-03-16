<script lang="ts">
	import { user } from '$lib/stores';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

	let taskTitle: string;
	let taskDescription: string;

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
				console.log(org_data);
			}
		}
	});

	const addTask = async () => {
		const { data, error } = await supabase
			.from('Tasks')
			.insert([{ title: taskTitle, description: taskDescription }]);
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
				.insert({ user_id: $user['id'], org_id: data['id'], admin: true });

			$user = { ...$user, sessionOrgId: data['id'] };

			organizations = [...organizations, { name: name, id: data[i]['org_id'] }];
		}

		return { data, error };
	};

	// red < 25
	// yellow 25 < 50
	// blue 50 < 75
	// green > 75
</script>

<section class="flex flex-col p-4 w-full">
	<h1 class="text-2xl mb-4 -mt-2">Hey! Ready to get working productively?</h1>
	<div class="text-2xl my-4 font-semibold">Dashboard</div>
	<div class="flex justify-around p-4 w-full">
		<div class="bg-foreground rounded-xl p-5 bg-opacity-5">
			<div class="text-foreground text-2xl font-semibold text-center mb-4">Tasks</div>
			<div class="flex">
				<form
					class="flex flex-col border-r-2 px-2 border-foreground border-solid"
					on:submit|preventDefault={addTask}
				>
					<span class="w-full text-center font-semibold -mt-2">Add Main Task</span>
					<div class="flex flex-col flex-grow h-full p-1">
						<label for="name" class="text-md">task title</label>
						<input
							type="text"
							name="name"
							id="name"
							class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
							placeholder="xxx-yyy-zzz"
							bind:value={taskTitle}
						/>
					</div>
					<div class="flex flex-col flex-grow h-full p-1">
						<label for="description" class="text-md">task description</label>
						<input
							type="text"
							name="description"
							id="name"
							class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
							placeholder="xxx-yyy-zzz"
							bind:value={taskDescription}
						/>
					</div>
					<div class="flex items-center justify-center p-1">
						<button class="bg-foreground text-background p-2 w-full rounded-lg" type="submit">
							<span>add task</span>
						</button>
					</div>
				</form>
				<div>
					<div class="flex flex-col gap-2 px-4">
						<span class="w-full text-center font-semibold -mt-2">Employees in Organization</span>
						<span class="text-md -mt-1 -mb-1">relavent employees</span>
						<div class="flex flex-col gap-4 h-[11rem] overflow-auto">
							<div>
								<div
									class="flex w-full bg-foreground justify-between p-2 items-center gap-8 rounded-lg"
								>
									<div class="text-background">Employee name</div>
									<button class="bg-accent p-1 text-foreground rounded-lg">Add Task</button>
								</div>
							</div>
							<div>
								<div
									class="flex w-full bg-foreground justify-between p-2 items-center gap-8 rounded-lg"
								>
									<div class="text-background">Employee name</div>
									<button class="bg-accent p-1 text-foreground rounded-lg">Add Task</button>
								</div>
							</div>
							<div>
								<div
									class="flex w-full bg-foreground justify-between p-2 items-center gap-8 rounded-lg"
								>
									<div class="text-background">Employee name</div>
									<button class="bg-accent p-1 text-foreground rounded-lg">Add Task</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="w-[20%]">
			<div class="bg-foreground rounded-xl p-5 bg-opacity-5">
				<div class="text-foreground text-2xl font-semibold text-center mb-4">Organization</div>

				<form on:submit|preventDefault={createOrg} class="-mt-2">
					<div class="flex flex-col flex-grow h-full">
						<label for="name" class="text-md">create organization</label>
						<input
							type="text"
							name="name"
							id="name"
							class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
							placeholder="cynosure"
						/>
					</div>
					<div class="flex items-center justify-center mt-2 mb-1">
						<button class="bg-accent text-foreground p-2 rounded-lg w-full" type="submit">
							<span>add organization</span>
						</button>
					</div>
					<span class="text-md">organizations part of</span>
					<div class="h-[6.5rem] overflow-auto">
						<div class="mt-2 flex flex-col gap-2">
							{#if organizations.length === 0}
								<span class="w-full text-center font-semibold">not part of any right now</span>
							{:else}
								{#each organizations as org}
									<div class="collapse bg-foreground text-foreground">
										<input type="radio" name="my-accordion-2" />
										<div
											class="collapse-title text-md font-medium flex justify-between items-center"
										>
											<div class="text-background font-semibold">{org['name']}</div>
										</div>
										<div class="collapse-content ml-auto">
											<div class="bg-accent text-foreground p-1 text-sm rounded-lg">
												Code: {org['id']}
											</div>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				</form>

				<div></div>
			</div>
		</div>

		<div class="flex bg-foreground bg-opacity-5 rounded-xl">
			<div class="p-5">
				<div class="text-foreground text-2xl font-semibold text-center mb-4">Weekly</div>
				<div
					class="radial-progress bg-background text-4xl text-foreground border-4 border-background"
					style="--value:70; --size: 14rem;"
					role="progressbar"
				>
					70%
				</div>
			</div>
			<div class="p-5">
				<div class="text-foreground text-2xl font-semibold text-center mb-4">Daily</div>
				<div
					class="radial-progress bg-background text-4xl text-foreground border-4 border-background"
					style="--value:70; --size: 14rem;"
					role="progressbar"
				>
					70%
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="text-2xl my-4 font-semibold">Employee Details</div>
		<div class="min-w-[95%] mx-auto flex flex-col gap-4">
			<div class="collapse bg-foreground text-foreground bg-opacity-100">
				<input type="radio" name="my-accordion-2" />
				<div class="collapse-title text-xl font-medium flex justify-between items-center">
					<div class="text-background">Employee 1</div>
					<div class="flex gap-4">
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 1</div>
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 2</div>
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 3</div>
					</div>
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div class="collapse bg-foreground text-foreground bg-opacity-100">
				<input type="radio" name="my-accordion-2" />
				<div class="collapse-title text-xl font-medium flex justify-between items-center">
					<div class="text-background">Employee 1</div>
					<div class="flex gap-4">
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 1</div>
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 2</div>
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 3</div>
					</div>
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div class="collapse bg-foreground text-foreground bg-opacity-100">
				<input type="radio" name="my-accordion-2" />
				<div class="collapse-title text-xl font-medium flex justify-between items-center">
					<div class="text-background">Employee 1</div>
					<div class="flex gap-4">
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 1</div>
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 2</div>
						<div class="bg-accent text-foreground p-2 rounded-lg">Task 3</div>
					</div>
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Style the scrollbar */
	.overflow-auto::-webkit-scrollbar {
		width: 12px;
		border-radius: 8px;
	}

	/* Track */
	.overflow-auto::-webkit-scrollbar-track {
		background: #d9d9d9; /* Change background color */
	}

	/* Handle */
	.overflow-auto::-webkit-scrollbar-thumb {
		background: #888; /* Change foreground color */
		border-radius: 8px;
	}

	/* Handle on hover */
	.overflow-auto::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
