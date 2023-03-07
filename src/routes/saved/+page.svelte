<script lang="ts">
	import EventList from '$lib/EventList.svelte';
	import { liked, booked } from '$lib/stores';
</script>

{#if ($booked.size > 0)}
	<p class="text-4xl font-extrabold mb-3 dark:text-white mt-10">Bokade event</p>
	<EventList list={Array.from($booked).map((e) => e.event)} />
{/if}

<p class="text-4xl font-extrabold mb-3 dark:text-white mt-10">Gillade event</p>
<EventList list={Array.from($liked)} />

<div class="mt-10" />
