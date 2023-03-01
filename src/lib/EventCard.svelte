<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import EventPopup from './EventPopup.svelte';
	import type { Event } from './types';
	import Heart from './Heart.svelte';

	enum Time {
		Past,
		Present,
		Future
	}

	export let event: Event;
	const start = new Date(event.date.start);
	const end = new Date(event.date.end);
	const now = new Date();

	const getTime = (date: Date) => {
		return `${date.getHours().toString().padStart(2, '0')}:${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;
	};

	let time: Time;
	if (end < now) {
		time = Time.Past;
	} else if (start < now) {
		time = Time.Present;
	} else {
		time = Time.Future;
	}

	let modalVisible = false;
</script>

<button on:click={() => (modalVisible = !modalVisible)}>
	<Card
		class="hover:scale-105 relative transition-transform text-left h-full border-0 {time ==
			Time.Past && 'opacity-20'}"
		img={event.image_url}
	>
		<div class="flex justify-between m-0">
			<p class="font-light">{getTime(start)} - {getTime(end)}</p>
			<Heart {event} />
		</div>
		<p class="text-lg font-bold m-0">{event.summary}</p>
		<p class="italic font-light">{event.organizer.name}</p>
		{#if time == Time.Present}
			<div
				class="absolute -top-2 -right-2 text-white bg-red-600 py-1 px-4 rounded-lg border-white border-2"
			>
				Just nu
			</div>
		{/if}
	</Card>
</button>

<EventPopup {event} visible={modalVisible} toggle={() => (modalVisible = !modalVisible)} />
