<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { Button, ButtonGroup } from 'flowbite-svelte';
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
	const {name, email} = event.organizer;
	let {start, end, last_updated} = event.date;
	start = (new Date(start)).toISOString().substring(11,16);
	end = (new Date(end)).toISOString().substring(11,16);
	const location = event.location;
	let b = true;
	function likeEvent() {
		b = !b;
	}
</script>

<Modal
	title={`${name}: ${summary}`}
	bind:open={visible}
	on:hide={() => (visible = toggle())}
>
	<svelte:fragment slot="default">
		BALLABALLABALAL
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{description}
		</p>

		  <p>
			start: {start}, end: {end}
		  </p>
		  <p>
			location: {location}
		  </p>
	  </svelte:fragment>
	  <svelte:fragment slot='footer'>
		<ButtonGroup class="space-x-px">
			<Button gradient color="purpleToBlue">Book</Button>
			<Button gradient color="greenToBlue"><a href={`mailto:${email}`}> email </a></Button>
			<Button class="align-end" on:click={likeEvent} gradient color="cyanToBlue">
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
