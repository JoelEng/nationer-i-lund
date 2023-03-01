<script lang="ts">
	import EventDayList from '$lib/EventDayList.svelte';
	import { inview } from 'svelte-inview';
	import { Spinner } from 'flowbite-svelte';
	import { indexDay } from './stores';

	const incNum = 5;

	let count = incNum;
	let loading: boolean;

	const inc = () => {
		if (!loading) {
			count += incNum;
		}
	};
</script>

{#key $indexDay}
	{#each [...Array(count).keys()] as i}
		<EventDayList
			date={new Date(new Date($indexDay).setDate($indexDay.getDate() + i))}
			bind:loading
		/>
	{/each}
	{#if loading}
		<div class="my-10 flex justify-center">
			<Spinner />
		</div>
	{/if}
{/key}
<div class="absolute bottom-60" use:inview on:enter={inc} />
