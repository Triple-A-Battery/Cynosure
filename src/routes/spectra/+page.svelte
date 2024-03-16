<script lang="ts">
	import { user } from '$lib/stores';

	let usableUser = $user;

	if ($user !== null) {
		usableUser = $user;
	} else {
		usableUser = { name: 'user', email: 'email', role: 'role' };
	}
	// red < 25
	// yellow 25 < 50
	// blue 50 < 75
	// green > 75
</script>

<section class="flex flex-col p-4 w-full">
	<h1 class="text-2xl mb-4">Hey! Ready to get working productively?</h1>
	<div class="flex justify-around p-4 w-[80%] mx-auto">
		<div class="bg-foreground rounded-xl p-5 bg-opacity-5">
			<div class="text-foreground text-2xl font-semibold text-center mb-4">Weekly</div>
			<div
				class="radial-progress bg-background text-4xl text-foreground border-4 border-background"
				style="--value:70; --size: 14rem;"
				role="progressbar"
			>
				70%
			</div>
		</div>
		<div class="bg-foreground rounded-xl p-5 bg-opacity-5">
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
</section>
