<script>
	import '../app.postcss';
	import Navbar from '$lib/Navbar.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<!-- <Navbar /> -->

<div class="flex justify-center p-4">
	<div class="max-w-screen-lg relative">
		<slot />
	</div>
</div>

<style>
	:global(*) {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
</style>
