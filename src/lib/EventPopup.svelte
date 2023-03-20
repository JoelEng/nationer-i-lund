<script lang="ts">
	import { Modal, Button, ButtonGroup, A} from 'flowbite-svelte';
	import Heart from './Heart.svelte';
	import BookingForm from './BookingForm.svelte';
	import type { Event as NationEvent} from './types';


//	export let event: NationEvent;
	export let visible: boolean;
	export let toggle: Function;
	export let description: string;
	export let summary: string;
	export let name: string;
	export let email: string;
	export let startDate: Date;
	export let endDate: Date;
	export let location: string;
	export let url:string;
	export let id:string;

	
	// const description = event['description'];
	// const summary = event['summary'];
	// const { name, email } = event.organizer;
	// let { start, end, last_updated } = event.date;
	// const location = event.location;
	
	let startTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;//start.toISOString().substring(11, 16);	//detta blir UTC inte CET
	let endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
	
	let event = {date:{start: startTime, end: endTime, last_updated:''}, organizer:{name: name, email: email}, location: location, description: description, summary: summary, url: url, id: id, image_url:''};
	//return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

</script>

<Modal title={`${name}: ${summary}`} bind:open={visible} on:hide={() => (visible = toggle())}>
	<svelte:fragment slot="default">
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{description}
		</p>

		<p>
			{startTime} - {endTime}
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

	<BookingForm {event}/>
	</svelte:fragment>
	<div slot="footer" class="flex w-full justify-between">
		<ButtonGroup class="space-x-px">
			<Button color="light" href="mailto:{email}">Kontakta oss</Button>
		</ButtonGroup>
		<Heart size={10} {event} />
	</div>
</Modal>
