<script lang="ts">
	import type { Event } from './types';
	import EventModal from './EventModal.svelte';

	enum Time {
		Past,
		Present,
		Future
	}

	export let event: Event;
	const regex = new RegExp(`(\\||-) ${event.organizer.name}`, 'ig');
	event.summary = event.summary.replace(regex, '');

	let startDate = new Date(event.date.start);
	let endDate = new Date(event.date.end);
	let now = new Date();
	$: {
		startDate = new Date(event.date.start);
		endDate = new Date(event.date.end);
		now = new Date();
		console.log(`update ${event.organizer.name}, ${event.date.start}`)
	}

	const getTime = (date: Date) => {
		return `${date.getHours().toString().padStart(2, '0')}:${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;
	};
	let timeString : string = " ";
	$: {
		timeString = `${getTime(startDate)} - ${getTime(endDate)}`;
	}

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

<div class="container {time == Time.Past && 'opacity-20'}">
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
			class="absolute -top-2 -right-2 text-white bg-red-400 py-1 px-4 rounded-lg border-white border-2 font-extrabold"
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
		padding: calc(10px + 0.7vw);
	}

	.container {
		position: relative;
	}
</style>
