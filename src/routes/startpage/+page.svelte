<script lang="ts">
	import { onMount } from 'svelte';

	import { getEmbedding } from '$lib/embedding';
	import { get, set } from '$lib/storage';
	import supabase from '$lib/supabase';

	let tasks = {
		Academics: [],
		Work: [],
		Personal: []
	};

	let focusedTask = '';

	onMount(async () => {
		let id = (await chrome.storage.local.get(['spectra'])).spectra;

		let { data } = await supabase.from('Tasks').select('*').eq('user_id', id);

		if (data) {
			for (var i of data) {
				tasks['Work'].push(i.task);
			}
		}

		let storedTasks = { ...tasks, ...(await chrome.storage.local.get('tasks')).tasks };
		if (!storedTasks) {
			await chrome.storage.local.set({ tasks: storedTasks });
		} else {
			tasks = storedTasks;
		}

		focusedTask = await get('task');
		console.log(focusedTask);
	});

	async function addTask(e) {
		const formData = new FormData(e.target as HTMLFormElement);

		tasks[formData.get('category')].push(formData.get('task') as string);
		chrome.storage.local.set({ tasks });

		for (let [key, value] of Object.entries(tasks)) {
			tasks[key] = [...value];
		}
	}

	async function save(e) {
		console.log(e.target.innerText);
		focusedTask = e.target.innerText;
		let t = e.target.innerText;
		let embedding = (await getEmbedding([t]))[0];
		set('task', t);
		set('taskEmbedding', embedding);
	}

	async function remove(e) {
		let category = e.target.getAttribute('category');
		let index = e.target.getAttribute('index');
		tasks[category].splice(index, 1);
		chrome.storage.local.set({ tasks });
	}
</script>

<div class="max-w-2xl h-screen m-auto">
	<div class="flex flex-col w-full justify-center h-full">
		<!-- <div class="w-full mb-10"> -->
		<!-- 	<input type="text" placeholder="Search" class="input input-bordered w-full" /> -->
		<!-- </div> -->
		<div>
			{#if focusedTask}
				<div class="mb-3">
					<h1 class="text-2xl font-semibold text-center">Focused Task</h1>
					<p class="font-normal leading-loose tracking-tight text-center text-6xl">
						{focusedTask}
					</p>
				</div>
			{/if}
		</div>
		<div class="flex flex-row justify-between space-x-6">
			{#each Object.keys(tasks) as category}
				<div
					class="py-6 px-8 w-full bg-amber-200 flex-col justify-start items-start inline-flex text-stone-900 overflow-hidden rounded-xl space-y-3"
				>
					<h1 class="bg-yellow-100 w-full text-3xl bold">{category}</h1>
					<ol class="text-lg font-normal leading-loose tracking-tight">
						{#each tasks[category] as task, i}
							<li class="cursor-pointer" on:click={save} on:dblclick={remove} {category} index={i}>
								{task}
							</li>
						{/each}
					</ol>
					<form class="space-y-3" on:submit|preventDefault={addTask}>
						<input type="hidden" name="category" value={category} />
						<input type="text" placeholder="Task..." class="input w-full" name="task" />
						<input type="submit" class="btn btn-primary w-full" value="Add Task" />
					</form>
				</div>
			{/each}
		</div>
	</div>
</div>
