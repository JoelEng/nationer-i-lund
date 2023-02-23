<script lang="ts">
	import { onMount } from 'svelte';
	import EventCard from './EventCard.svelte';
	import { getDay } from './fetch';
	import type { Event } from './types';

	export let date: Date;
	export let loading: boolean;
	let list: Event[];

	onMount(async () => {
		loading = true;
		list = await getDay(date);
		loading = false;
	});

	const weekDays = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];

	const dayString = () => {
		let day = new Date();
		if (date.toDateString() === day.toDateString()) {
			return 'Idag';
		}
		day.setDate(day.getDate() + 1);
		if (date.toDateString() === day.toDateString()) {
			return 'Imorgon';
		}
		return `${weekDays[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
	};
</script>

{#if list}
	<p class="text-4xl font-extrabold mb-3 dark:text-white mt-10">{dayString()}</p>
	<div class="grid gap-4 grid-cols-3 auto-cols-auto">
		{#each list as event}
			<EventCard {event} />
		{/each}
	</div>
{/if}
