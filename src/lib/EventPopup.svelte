<script lang="ts">
	import { Modal, Button, ButtonGroup, A } from 'flowbite-svelte';
	import Heart from './heartOutline.svelte';
	import FilledHeart from './heartFilled.svelte';
	import type { Event } from './types';

	let defaultModal = false;

	let h = Heart;
	export let event: Event;
	export let visible: boolean;
	export let toggle: Function;
	const description = event['description'];
	const summary = event['summary'];

	const organizer = event['organizer'];
	const { name, email } = event.organizer;
	let { start, end, last_updated } = event.date;
	start = new Date(start).toISOString().substring(11, 16);
	end = new Date(end).toISOString().substring(11, 16);
	const location = event.location;
	let b = true;
</script>

<Modal title={`${name}: ${summary}`} bind:open={visible} on:hide={() => (visible = toggle())}>
	<svelte:fragment slot="default">
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{description}
		</p>

		<p>
			{start} - {end}
		</p>
		<p>
			<!--  https://www.google.com/maps/search/?api=1&parameters 
			Replace parameeters with "query={location}" and it will ridirect to google maps -->
			<A
				target="_blank"
				class="font-medium hover:underline"
				href={`https://www.google.com/maps/search/?api=1&query=${location}`}>{location}</A
			>
		</p>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<ButtonGroup class="space-x-px">
			<Button gradient color="purpleToBlue">Book</Button>
			<Button gradient color="greenToBlue"><a href={`mailto:${email}`}> email </a></Button>
			<Button class="align-end" on:click={() => (b = !b)} gradient color="cyanToBlue">
				{#if b}
					<Heart />
				{:else}
					<FilledHeart />
				{/if}
			</Button>
		</ButtonGroup>
		<!-- <button on:click={likeEvent}>
			{#if b}
				<Heart />
			{:else}
				<FilledHeart />
			{/if}
		</button> -->
	</svelte:fragment>
</Modal>
