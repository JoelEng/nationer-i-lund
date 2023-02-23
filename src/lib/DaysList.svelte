<script lang="ts">
	import EventList from '$lib/EventList.svelte';
	import { inview } from 'svelte-inview';
	import { Spinner } from 'flowbite-svelte';

	const today = new Date();
	const incNum = 5;

	let count = incNum;
	let loading: boolean;

	const inc = () => {
		if (!loading) {
			count += incNum;
		}
	};
</script>

{#each [...Array(count).keys()] as i}
	<EventList date={new Date(new Date().setDate(today.getDate() + i))} bind:loading />
{/each}
{#if loading}
	<div class="my-10 flex justify-center">
		<Spinner />
	</div>
{/if}
<div class="absolute bottom-60" use:inview on:enter={inc} />
