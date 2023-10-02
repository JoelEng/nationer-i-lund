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

<style>
	:global(html) {
		height: -webkit-fill-available;
	}

	:global(body) {
		height: 100vh;
		height: -webkit-fill-available;
	}
</style>
