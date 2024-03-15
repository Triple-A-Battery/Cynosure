<script lang="ts">
	import { user } from '$lib/stores';

	let usableUser: User;

	if ($user !== null) {
		usableUser = $user;
	} else {
		usableUser = { name: '', email: '', role: '' };
	}
</script>

<section class="flex flex-col">
	<h1 class="text-2xl">Hey {usableUser['name']}</h1>
</section>
