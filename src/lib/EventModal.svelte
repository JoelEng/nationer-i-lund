<script lang="ts">
	import Location from './icons/Location.svelte';
	import Mail from './icons/Mail.svelte';
	import Link from './icons/Link.svelte';
	import type { Event } from './types';
	import Modal from './Modal.svelte';

	enum Time {
		Past,
		Present,
		Future
	}

	export let event: Event;
	export let time: Time;
	export let timeString: string;
	export let visible: boolean;
	export let toggle: () => void;

	$: modalType = window.innerWidth > 600 ? 'modal' : 'sheet';
</script>

<Modal {visible} {toggle}>
	<p class="organizer">{event.organizer.name}</p>
	<p class="title">{event.summary}</p>
	<p class="time">{timeString}</p>
	<div class="divider" />
	<div class="contents">
		{#if modalType == 'sheet'}
			<img src={event.image_url} alt="event" />
		{/if}
		<div class="buttonContainer">
			{#if event.location}
				<a
					class="button"
					style:background="rgb(139, 255, 224)"
					target="_blank"
					href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
				>
					<Location /> hitta hit
				</a>
			{/if}
			{#if event.organizer.email}
				<a class="button" target="_blank" href={`mailto:${event.organizer.email}`}>
					<Mail /> maila nationen
				</a>
			{/if}
			{#if event.organizer.website}
				<a
					class="button"
					style:background="rgb(255, 140, 198)"
					target="_blank"
					href={`${event.organizer.website}`}
				>
					<Link /> hemsida
				</a>
			{/if}
		</div>
		<p class="description">
			{event.description}
		</p>
	</div>
	{#if time == Time.Present}
		<div
			class="absolute -top-2 right-4 text-white bg-red-400 py-1 px-4 rounded-lg border-white border-2 font-extrabold"
		>
			Just nu
		</div>
	{/if}
</Modal>

<style>
	.title {
		font-size: 1.4rem;
		font-weight: bolder;
		text-align: center;
	}

	.organizer {
		font-size: 1rem;
		font-weight: lighter;
		font-style: italic;
		text-align: center;
	}

	.time {
		font-size: 1.05rem;
		font-weight: 300;
		text-align: center;
	}

	.divider {
		width: 70%;
		border-top: 1px solid lightgray;
		align-self: center;
		margin-top: 20px;
	}

	.contents {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-top: 20px;
	}

	.button {
		width: fit-content;
		padding: 6px 14px;
		border-radius: 200px;
		background: rgb(139, 187, 255);
		color: rgba(0, 0, 0, 0.5);
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.buttonContainer {
		display: flex;
		gap: 8px;
	}

	img {
		border-radius: 20px;
		align-self: center;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
	}
</style>
