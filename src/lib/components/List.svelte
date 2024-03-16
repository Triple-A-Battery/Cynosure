<script lang="ts">
	export let category: string;
	export let tasks: string[];

	import { getEmbedding } from '$lib/embedding';
	import { set } from '$lib/storage';

	let task = '';

	async function addTask() {
		if (task == '') return;
		tasks.push(task);

		let curTasks = await chrome.storage.local.get('tasks');
		curTasks[category] = tasks;
		console.log(curTasks);
		chrome.storage.local.set({ tasks: curTasks });

		tasks = [...tasks];
		task = '';
	}

	async function save(e) {
		console.log(e.target);
		let t = e.target.innerText;
		let embedding = (await getEmbedding([t]))[0];
		set('task', t);
		set('taskEmbedding', embedding);
	}
</script>

<div
	class="py-6 px-8 w-full bg-amber-200 flex-col justify-start items-start inline-flex text-stone-900 overflow-hidden rounded-xl space-y-3"
>
	<h1 class="bg-yellow-100 w-full text-3xl bold">{category}</h1>
	<ol class="text-lg font-normal leading-loose tracking-tight">
		{#each tasks as task}
			<li class="cursor-pointer" on:click={save}>{task}</li>
		{/each}
	</ol>
	<form class="space-y-3" on:submit|preventDefault={addTask}>
		<input type="text" placeholder="Task..." class="input w-full" bind:value={task} />
		<input type="submit" class="btn btn-primary w-full" value="Add Task" />
	</form>
</div>
