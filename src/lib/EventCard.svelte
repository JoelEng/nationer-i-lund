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
	
	let description = event.description;
	let id = event.id;
	let location = event.location;
	let {name, email} = event.organizer;
	let summary = event.summary;
	let url = event.url;
	let start = event.date.start;
	let end = event.date.end;
	let startDate = new Date(event.date.start);
	let endDate = new Date(event.date.end);
	let now = new Date();
	$:{
		description = event.description;
		id = event.id;
		location = event.location;
		name = event.organizer.name;
		email = event.organizer.email;
		summary = event.summary;
		url = event.url;
		start = event.date.start;
		end = event.date.end;
		startDate = new Date(event.date.start);
		endDate = new Date(event.date.end);
		now = new Date();
	}


	const getTime = (date: Date) => {
		return `${date.getHours().toString().padStart(2, '0')}:${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;
	};

	let time: Time;
	if (endDate < now) {
		time = Time.Past;
	} else if (startDate < now) {
		time = Time.Present;
	} else {
		time = Time.Future;
	}

	let modalVisible = false;
	const tmp = () => {
		modalVisible = !modalVisible;
	}
	
</script>

<button on:click={tmp}>
	<Card
		class="hover:scale-105 relative transition-transform text-left h-full border-0 {time ==
			Time.Past && 'opacity-20'}"
		img={event.image_url}
	>
		<div class="flex justify-between m-0">
			<p class="font-light">{getTime(startDate)} - {getTime(endDate)}</p>
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

<EventPopup {description} {summary} {name} {email} {startDate} {endDate} {location} {url} {id}  visible={modalVisible} toggle={() => (modalVisible = !modalVisible)} />
