<script lang="ts">
	import List from '$lib/components/List.svelte';
	import { onMount } from 'svelte';

	import { getEmbedding } from '$lib/embedding';
	import { set } from '$lib/storage';

	let tasks = {
		Academics: [],
		Work: [],
		Personal: []
	};

	onMount(async () => {
		let storedTasks = { ...tasks, ...(await chrome.storage.local.get('tasks')).tasks };
		if (!storedTasks) {
			await chrome.storage.local.set({ tasks: storedTasks });
		} else {
			tasks = storedTasks;
		}
	});

	async function addTask(e) {
		const formData = new FormData(e.target as HTMLFormElement);

		tasks.push(formData.get('task') as string);

		let curTasks = await chrome.storage.local.get('tasks');
		curTasks[category] = tasks;
		console.log(curTasks);
		chrome.storage.local.set({ tasks: curTasks });

		tasks = [...tasks];
	}

	async function save(e) {
		console.log(e.target);
		let t = e.target.innerText;
		let embedding = (await getEmbedding([t]))[0];
		set('task', t);
		set('taskEmbedding', embedding);
	}
</script>

<div class="max-w-2xl h-screen m-auto">
	<div class="flex flex-col w-full justify-center h-full">
		<div class="w-full mb-10">
			<input type="text" placeholder="Search" class="input input-bordered w-full" />
		</div>
		<div class="flex flex-row justify-between space-x-6">
			{#each Object.keys(tasks) as category}
				<div
					class="py-6 px-8 w-full bg-amber-200 flex-col justify-start items-start inline-flex text-stone-900 overflow-hidden rounded-xl space-y-3"
				>
					<h1 class="bg-yellow-100 w-full text-3xl bold">{category}</h1>
					<ol class="text-lg font-normal leading-loose tracking-tight">
						{#each tasks[category] as task}
							<li class="cursor-pointer" on:click={save}>{task}</li>
						{/each}
					</ol>
					<form class="space-y-3" on:submit|preventDefault={addTask}>
						<input type="text" placeholder="Task..." class="input w-full" name="task" />
						<input type="submit" class="btn btn-primary w-full" value="Add Task" />
					</form>
				</div>
			{/each}
		</div>
	</div>
</div>
