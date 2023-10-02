<script lang="ts">
	import EventCard from './EventCard.svelte';
	import type { Event } from './types';
	import { selectedOrganizers, selectedTime } from './stores';

	export let list: Event[];

	const colNum = window.innerWidth > 600 ? 3 : 2;

	let filteredList = list;
	$: {
		filteredList = list.filter(
			(e) => new Date(e.date.end).getTime() - new Date(e.date.start).getTime() > 0
		);
		if ($selectedOrganizers.size > 0) {
			filteredList = list.filter((event) => $selectedOrganizers.has(event.organizer.name));
		}
		if ($selectedTime.size > 0) {
			$selectedTime.forEach((time) => {
				switch (time) {
					case 'Lunch':
						filteredList = list.filter((event) => new Date(event.date.start).getHours() < 13);
						break;
					case 'Eftermiddag':
						filteredList = list.filter(
							(event) =>
								new Date(event.date.start).getHours() < 18 &&
								new Date(event.date.start).getHours() > 13
						);
						break;
					case 'Kväll':
						filteredList = list.filter((event) => new Date(event.date.start).getHours() > 17);
						break;
					default:
				}
			});
		}
		filteredList = filteredList;
	}
</script>

<div class="grid gap-4 grid-cols-{colNum} auto-cols-auto">
	{#each filteredList as event}
		<EventCard {event} />
	{/each}
</div>
