<script lang="ts">
	import type { Event } from './types';
	import EventModal from './EventModal.svelte';

	enum Time {
		Past,
		Present,
		Future
	}

	export let event: Event;

	let description = event.description;
	let id = event.id;
	let location = event.location;
	let { name, email } = event.organizer;
	let summary = event.summary;
	let url = event.url;
	let start = event.date.start;
	let end = event.date.end;
	let startDate = new Date(event.date.start);
	let endDate = new Date(event.date.end);
	let now = new Date();
	$: {
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
	const timeString = `${getTime(startDate)} - ${getTime(endDate)}`;

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
	};
</script>

<div class="container hover:scale-105 {time == Time.Past && 'opacity-20'}">
	<button on:click={tmp}>
		<div class="card">
			<img src={event.image_url} alt="" />
			<div class="card-content">
				<div class="flex justify-between m-0">
					<p class="font-light">{timeString}</p>
					<!-- <Heart {event} /> -->
				</div>
				<p class="text-lg font-bold m-0">{event.summary}</p>
				<p class="italic font-light">{event.organizer.name}</p>
			</div>
		</div>
	</button>
	{#if time == Time.Present}
		<div
			class="absolute -top-2 -right-2 text-white bg-red-500 py-1 px-4 rounded-lg border-white border-2 font-extrabold"
		>
			Just nu
		</div>
	{/if}
</div>

<EventModal
	{event}
	{time}
	{timeString}
	visible={modalVisible}
	toggle={() => (modalVisible = !modalVisible)}
/>

<style>
	.card {
		position: relative;
		text-align: left;
		border-radius: 16px;
		background: white;
		overflow: hidden;
	}

	.card > img {
		height: calc(8rem + 4vw);
		width: 100%;
		object-fit: cover;
	}

	.card-content {
		padding: calc(10px + 0.5vw);
	}

	.container {
		position: relative;
		transition: transform 105ms;
	}
</style>
