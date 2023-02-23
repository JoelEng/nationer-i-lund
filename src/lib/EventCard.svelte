<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import EventPopup from './EventPopup.svelte';
	import type { Event } from './types';

	export let event: Event;
	const start = new Date(event.date.start);
	const end = new Date(event.date.end);

	const getTime = (date: Date) => {
		return `${date.getHours().toString().padStart(2, '0')}:${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;
	};

	let modalVisible = false;
</script>

<button on:click={() => (modalVisible = !modalVisible)}>
	<Card class="hover:scale-105 transition-transform text-left h-full" img={event.image_url}>
		<div class="flex justify-between m-0">
			<p class="font-light">{getTime(start)} - {getTime(end)}</p>
			<p>hjärta</p>
		</div>
		<p class="text-lg font-bold m-0">{event.summary}</p>
		<p class="italic font-light">{event.organizer.name}</p>
	</Card>
</button>

<EventPopup {event} visible={modalVisible} toggle={() => (modalVisible = !modalVisible)} />
