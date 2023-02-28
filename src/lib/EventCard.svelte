<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import EventPopup from './EventPopup.svelte';
	import type { Event } from './types';
	import Heart from './heartOutline.svelte';
	import FilledHeart from './heartFilled.svelte';

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
	let heartFilled = true;
</script>

<button on:click={() => (modalVisible = !modalVisible)}>
	<Card
		class="hover:scale-105 transition-transform text-left h-full border-0"
		img={event.image_url}
	>
		<div class="flex justify-between m-0">
			<p class="font-light">{getTime(start)} - {getTime(end)}</p>
			<button on:click|stopPropagation={() => (heartFilled = !heartFilled)}>
				{#if heartFilled}
					<Heart />
				{:else}
					<FilledHeart />
				{/if}
			</button>
		</div>
		<p class="text-lg font-bold m-0">{event.summary}</p>
		<p class="italic font-light">{event.organizer.name}</p>
	</Card>
</button>

<EventPopup {event} visible={modalVisible} toggle={() => (modalVisible = !modalVisible)} />
