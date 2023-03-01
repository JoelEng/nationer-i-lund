<script lang="ts">
	import EventCard from './EventCard.svelte';
	import type { Event } from './types';
	import {selectedOrganizers} from './stores';


	export let list: Event[];
	let filteredList: Event[];
	$: {
		console.log($selectedOrganizers)
		if($selectedOrganizers.size === 0) {
			filteredList = list;
		} else {
			filteredList = list.filter((event) => $selectedOrganizers.has(event.organizer.name))
		}
	} 

</script>

<div class="grid gap-4 grid-cols-3 auto-cols-auto">
	{#each filteredList as event}
		<EventCard {event} />
	{/each}
</div>
