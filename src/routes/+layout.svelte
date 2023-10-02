<script>
	import '../app.postcss';
	import Navbar from '$lib/Navbar.svelte';
</script>

<!-- <Navbar /> -->

<div class="flex justify-center p-4">
	<div class="max-w-screen-lg relative">
		<slot />
	</div>
</div>
