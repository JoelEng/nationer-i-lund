<script lang="ts">
	import EventCard from './EventCard.svelte';
	import type { Event } from './types';

	export let list: Event[];
</script>

<div class="grid gap-4 grid-cols-3 auto-cols-auto">
	{#each list as event}
		<EventCard {event} />
	{/each}
</div>
