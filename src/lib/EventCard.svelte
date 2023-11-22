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

	function getWebsite(org: string): string {
		const organ = org;
		switch (organ) {
			case 'Västgöta Nation':
				return 'https://www.vgnation.se/';
				break;
			case 'Kalmar Nation':
				return 'https://www.kalmarnation.nu/';
				break;
			case 'Lunds Nation':
				return 'https://lundsnation.com/en/the-nation/';
				break;
			case 'Göteborgs Nation':
				return 'https://www.goteborgsnation.com/';
				break;
			case 'Sydskånska Nationen':
				return 'https://sydskanska.se/en/';
				break;
			case 'Östgöta Nation':
				return 'https://www.ostgota.nu/';
				break;
			case 'Wermlands Nation':
				return 'https://www.wermlandsnation.se/';
				break;
			case 'Blekingska Nationen':
				return 'https://www.blekingska.se/';
				break;
			case 'Helsingkrona Nation':
				return 'https://helsingkrona.se/';
				break;
			case 'Hallands Nation':
				return 'https://www.hallandsnation.se/';
				break;
		}
		return '';
	}

	event.organizer.website = getWebsite(event.organizer.name);

	let startDate = new Date(event.date.start);
	let endDate = new Date(event.date.end);
	let now = new Date();
	$: {
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
	let timeString: string = ' ';
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

<div class="cardContainer {time == Time.Past && 'opacity-20'}">
	<button on:click={tmp}>
		<div class="card">
			<img src={event.image_url} alt="" />
			<div class="cardContent">
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

	.cardContent {
		padding: calc(10px + 0.7vw);
	}

	.cardContainer {
		position: relative;
		display: flex;
		flex-direction: column;
	}
</style>
