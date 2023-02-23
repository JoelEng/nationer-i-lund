<script lang="ts">
	import EventCard from './EventCard.svelte';
	import { getDay } from './fetch';
	import type { Event } from './types';

	export let date: Date;
	export let loading: boolean;

	const exampleList = async (): Promise<Event[]> => {
		loading = true;
		const a = await getDay(date);
		loading = false;
		return a;
	};
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

{#await exampleList() then list}
	<p class="text-4xl font-extrabold mb-3 dark:text-white mt-10">{dayString()}</p>
	<div class="grid gap-4 grid-cols-3 auto-cols-auto">
		{#each list as event}
			<EventCard {event} />
		{/each}
	</div>
{/await}
