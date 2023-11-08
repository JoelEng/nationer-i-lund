<script lang="ts">
	import About from '$lib/About.svelte';
	import DaysList from '$lib/DaysList.svelte';
	import Filter from '$lib/Filter.svelte';

	let loading: boolean = true;
</script>

<div class="topbar">
	{#if !loading}
		<Filter />
		<!-- <About /> -->
	{/if}
</div>
<DaysList bind:loading />

<style>
	.topbar {
		position: absolute;
		right: 0;
		font-size: 1.7rem;
		/* color: rgba(0, 0, 0, 0.7); */
		display: flex;
		justify-content: flex-end;
		/* justify-content: space-between; */
		gap: 1rem;
		margin: 1rem 1rem;
		/* margin-inline: 1rem; */
	}
</style>
