<script lang="ts">
	import EventCard from './EventCard.svelte';
	import type { Event } from './types';
	import { selectedOrganizers } from './stores';

	export let list: Event[];

	let filteredList = list;
	$: {
		filteredList = list.filter(
			(e) => new Date(e.date.end).getTime() - new Date(e.date.start).getTime() > 0
		);
		if ($selectedOrganizers.size > 0) {
			filteredList = list.filter((event) => $selectedOrganizers.has(event.organizer.name));
		}
	}
</script>

<div class="grid gap-4 grid-cols-3 auto-cols-auto">
	{#each filteredList as event}
		<EventCard {event} />
	{/each}
</div>
