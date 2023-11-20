<script lang="ts">
	import EventCard from './EventCard.svelte';
	import type { Event } from './types';
	import { selectedOrganizers, selectedTimes } from './stores';

	export let list: Event[];

	let filteredList = list;
	$: {
		filteredList = list.filter(
			(e) => new Date(e.date.end).getTime() - new Date(e.date.start).getTime() > 0
		);
		if ($selectedOrganizers.size > 0) {
			filteredList = list.filter((event) => $selectedOrganizers.has(event.organizer.name));
		}
		if ($selectedTimes.size > 0) {
			$selectedTimes.forEach((time) => {
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

<div class="listContainer">
	{#each filteredList as event}
		<EventCard {event} />
	{/each}
</div>

<style>
	.listContainer {
		max-width: 1200px;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 700px) {
		.listContainer {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
