<script lang="ts">
	import { Modal, Button, ButtonGroup, A, Input, Label } from 'flowbite-svelte';
	import Heart from './Heart.svelte';
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

		<form class="flex flex-col">
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<Label for="first_name">Förnamn</Label>
					<Input type="text" id="first_name" placeholder="Joel" required />
				</div>

				<div>
					<Label for="last_name">Efternamn</Label>
					<Input type="text" id="last_name" placeholder="Joelsson" required />
				</div>

				<div>
					<Label for="email">Emejl</Label>
					<Input type="email" id="email" placeholder="joel@joel.se" required />
				</div>

				<div>
					<Label for="tel">Telefonnummer</Label>
					<Input type="tel" id="tel" placeholder="0703180710" required />
				</div>
			</div>
			<Button type="submit" color="blue">Boka</Button>
		</form>
	</svelte:fragment>
	<div slot="footer" class="flex w-full justify-between">
		<ButtonGroup class="space-x-px">
			<Button color="light" href="mailto:{email}">Kontakta oss</Button>
		</ButtonGroup>
		<Heart size={10} {event} />
	</div>
</Modal>
