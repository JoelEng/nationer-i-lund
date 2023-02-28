<script lang="ts">
	import EventList from '$lib/EventList.svelte';
	import { liked } from '$lib/stores';
</script>

<p class="text-4xl font-extrabold mb-3 dark:text-white mt-10">Sparade event</p>
<EventList list={Array.from($liked)} />

<div class="mt-10" />
