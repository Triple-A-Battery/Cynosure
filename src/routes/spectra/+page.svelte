<script lang="ts">
	import { user } from '$lib/stores';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let taskTitle: string;
	let taskDescription: string;

	let name: string;

	let empCode: string;

	let empRole: string;
	let empEditCode: string;

	let organizations = [];
	let employees = [];

	let weekly = 0;
	let monthly = 0;

	let removeCode: string;

	let addEmpClicked = false;

	async function getWeekly() {
		const today = new Date();
		const lastWeekStart = new Date(today);
		lastWeekStart.setDate(today.getDate() - 7);
		const lastWeekEnd = new Date(today);

		const dateString1 = lastWeekStart.toISOString().split('T')[0];
		const dateString2 = lastWeekEnd.toISOString().split('T')[0];

		const { data, error } = await supabase
			.from('Stats')
			.select('*')
			.lt('created_at', dateString2.concat('T23:59:59.999Z')) // Set end time to last millisecond of Sunday
			.gt('created_at', dateString1);

		if (error) {
			console.error('Error fetching data:', error);
		} else {
			console.log('Data from last week:', data);
			let productiveCount = 0;
			let unproductiveCount = 0;
			for (let i of data) {
				if (i.relevance > 0.55) {
					productiveCount++;
				} else {
					unproductiveCount++;
				}
			}
			weekly = Math.round((productiveCount / (productiveCount + unproductiveCount)) * 100);
		}
	}

	async function getMonthly() {
		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Set to last day of the month

		const dateString1 = firstDayOfMonth.toISOString().split('T')[0];
		const dateString2 = lastDayOfMonth.toISOString().split('T')[0].concat('T23:59:59.999Z'); // Include last millisecond of last day

		const { data, error } = await supabase
			.from('Stats')
			.select('*')
			.lt('created_at', dateString2)
			.gt('created_at', dateString1);

		if (error) {
			console.error('Error fetching data:', error);
		} else {
			console.log('Data from this month:', data);
			let productiveCount = 0;
			let unproductiveCount = 0;
			for (let i of data) {
				if (i.relevance > 0.55) {
					productiveCount++;
				} else {
					unproductiveCount++;
				}
			}
			monthly = Math.round((productiveCount / (productiveCount + unproductiveCount)) * 100);
		}
	}

	onMount(async () => {
		let { data, error } = await supabase
			.from('UserOrganizationRelations')
			.select()
			.eq('user_id', $user.id);

		if (data !== null) {
			for (let i = 0; i < data.length; i++) {
				let org_data = await supabase
					.from('Organizations')
					.select()
					.eq('id', data[i]['org_id'])
					.single();

				organizations.push({ name: org_data['data']['name'], id: data[i]['org_id'] });
				organizations = [...organizations];
			}
		}

		console.log($user.sessionOrgId);
		// console.log(user_data);
		getWeekly();
		getMonthly();
	});

	const addUserToOrg = async () => {
		let { data, error } = await supabase.from('Users').select().eq('id', empCode).single();

		if (error) {
			alert('user doesnt exist');
		} else {
			let exec = await supabase
				.from('UserOrganizationRelations')
				.insert([{ org_id: $user.sessionOrgId, user_id: empCode }]);

			employees.push({ name: data.name, email: data.email, id: data.id, role: data.role });
			employees = [...employees];

			addEmpClicked = false;
		}
	};

	const removeEmployee = async () => {
		let { data, error } = await supabase
			.from('UserOrganizationRelations')
			.delete()
			.eq('user_id', removeCode)
			.eq('org_id', $user.sessionOrgId);
	};

	const editEmployeeRole = async () => {
		let { data, error } = await supabase
			.from('Users')
			.update({ role: empRole })
			.eq('id', empEditCode);

		console.log(error);
	};

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

			organizations.push({ name: name, id: data['id'] });
			organizations = [...organizations];
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
						<span class="text-md -mt-1 -mb-1"
							>{employees.length === 0 ? 'no ' : ''}relavent employees</span
						>
						<div class="flex flex-col gap-4 h-[11rem] overflow-auto">
							{#each employees as employee}
								<div>
									<div
										class="flex w-full bg-foreground justify-between p-2 items-center gap-8 rounded-lg"
									>
										<div class="text-background">{employee.name}</div>
										<button class="bg-accent p-1 text-foreground rounded-lg">Add Task</button>
									</div>
								</div>
							{/each}
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
							bind:value={name}
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
									<div transition:slide class="collapse bg-foreground text-foreground">
										<input type="radio" name="my-accordion-2" />
										<div
											class="collapse-title text-md font-medium flex justify-between items-center"
										>
											<div class="text-background font-semibold">{org['name']}</div>
										</div>
										<div class="collapse-content ml-auto">
											<div
												class="bg-accent text-foreground p-1 text-sm rounded-lg flex flex-col gap-2"
											>
												Code: {org['id']}
												<button
													class="text-background bg-foreground p-2 rounded-lg"
													on:click|preventDefault={async () => {
														if ($user.sessionOrgId === org.id) {
															return;
														}
														if (employees.length !== 0) {
															employees = [];
														}

														$user.sessionOrgId = org.id;

														const { data, error } = await supabase
															.from('UserOrganizationRelations')
															.select()
															.eq('org_id', $user.sessionOrgId);

														if (!error) {
															for (let i = 0; i < data.length; i++) {
																const userData = await supabase
																	.from('Users')
																	.select()
																	.eq('id', data[i].user_id)
																	.single();

																employees.push({
																	name: userData.data.name,
																	email: userData.data.email,
																	id: userData.data.id,
																	role: userData.data.role
																});

																employees = [...employees];
															}
														}
													}}>select</button
												>
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
				<div class="text-foreground text-2xl font-semibold text-center mb-4">Monthly</div>
				<div
					class="radial-progress bg-background text-4xl text-foreground border-4 border-background"
					style="--value:{monthly}; --size: 14rem;"
					role="progressbar"
				>
					{monthly}%
				</div>
			</div>
			<div class="p-5">
				<div class="text-foreground text-2xl font-semibold text-center mb-4">Weekly</div>
				<div
					class="radial-progress bg-background text-4xl text-foreground border-4 border-background"
					style="--value:{weekly}; --size: 14rem;"
					role="progressbar"
				>
					{weekly}%
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="text-2xl my-4 font-semibold flex justify-between">
			<div>Employee Details</div>
			<div>
				<button
					class={addEmpClicked === true
						? 'bg-red text-foreground p-2 px-4 w-12 rounded-lg'
						: 'bg-accent text-foreground p-2 px-4 w-12 rounded-lg'}
					on:click={() => {
						addEmpClicked = addEmpClicked === true ? false : true;
					}}>{addEmpClicked === true ? '-' : '+'}</button
				>
			</div>
		</div>
		<div class="flex w-full justify-around">
			{#if addEmpClicked}
				<div transition:slide class="flex gap-20">
					<div class="w-[22rem] rounded-lg bg-foreground p-8 text-background">
						<span class="text-lg font-semibold w-full mb-2 flex justify-center"
							>Add New Employee</span
						>
						<form class="flex flex-col gap-2" on:submit|preventDefault={addUserToOrg}>
							<label for="code" class="text-md">employee code</label>
							<input
								type="text"
								name="code"
								id="code"
								class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
								placeholder="xxx-yyy-zzz"
								bind:value={empCode}
							/>

							<div class="flex items-center justify-center p-1 mt-2">
								<button class="bg-accent text-foreground p-2 w-full rounded-lg" type="submit">
									<span>add employee</span>
								</button>
							</div>
						</form>
					</div>
					<div class="w-[22rem] rounded-lg bg-foreground p-8 text-background">
						<span class="text-lg font-semibold w-full mb-2 flex justify-center"
							>Remove An Employee</span
						>
						<form class="flex flex-col gap-4" on:submit|preventDefault={removeEmployee}>
							<label for="code" class="text-md">employee code</label>
							<input
								type="text"
								name="code"
								id="code"
								class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
								placeholder="xxx-yyy-zzz"
								bind:value={removeCode}
							/>

							<div class="flex items-center justify-center p-1">
								<button class="bg-accent text-foreground p-2 w-full rounded-lg" type="submit">
									<span>remove employee</span>
								</button>
							</div>
						</form>
					</div>
					<div
						class="w-[22rem] rounded-lg bg-foreground p-8 text-background items-center justify-center"
					>
						<span class="text-lg font-semibold w-full mb-2 flex justify-center mt-2"
							>Edit An Employee's Role</span
						>
						<form
							class="flex flex-col gap-4 items-center justify-center"
							on:submit|preventDefault={editEmployeeRole}
						>
							<div class="flex gap-2">
								<div class="flex flex-col">
									<label for="code" class="text-md">employee code</label>
									<input
										type="text"
										name="code"
										id="code"
										class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
										placeholder="xxx-yyy-zzz"
										bind:value={empEditCode}
									/>
								</div>
								<div class="flex flex-col">
									<label for="code" class="text-md">new role</label>
									<input
										type="text"
										name="code"
										id="code"
										class="bg-gray-50 border border-gray-300 text-foreground rounded-lg focus:border-foreground block w-full p-2"
										placeholder="xxx-yyy-zzz"
										bind:value={empRole}
									/>
								</div>
							</div>

							<div class="flex items-center justify-center p-1 w-full">
								<button class="bg-accent text-foreground p-2 w-full rounded-lg" type="submit">
									<span>edit employee</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}
		</div>
		<div class="min-w-[95%] mx-auto flex flex-col gap-4 mt-8">
			{#if employees.length === 0}
				<div class="w-full text-center font-semibold">No employees in organization</div>
			{:else}
				{#each employees as employee}
					<div transition:slide class="collapse bg-foreground text-foreground bg-opacity-100">
						<input type="radio" name="my-accordion-2" />
						<div class="collapse-title text-xl font-medium flex justify-between items-center">
							<div class="text-background">{employee.name}</div>
							<div class="flex gap-4">
								<div class="bg-accent text-foreground p-2 rounded-lg font-normal">
									{employee.role}
								</div>
							</div>
						</div>
						<div class="collapse-content flex w-fit">
							<div class="bg-accent text-foreground p-1 text-sm rounded-lg flex flex-col gap-2">
								Code: {employee.id}
							</div>
						</div>
					</div>
				{/each}
			{/if}
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
