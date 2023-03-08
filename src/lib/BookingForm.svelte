<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import type { Event as NationEvent, BookedEvent } from './types';
	import { booked } from './stores';

	export let event: NationEvent;
	let is_booked: Boolean = [...$booked].some((e) => e.event.id === event.id);

	let booked_event = Array.from($booked).find((e) => e.event.id == event.id);
	let f_name = booked_event?.f_name ?? '';
	let l_name = booked_event?.l_name ?? '';
	let email = booked_event?.email ?? '';
	let tel = booked_event?.tel ?? '';

	const handleSubmit = (e: Event) => {
		e.stopPropagation();
		e.preventDefault();
		const f_name = (document.getElementById('first_name') as HTMLInputElement).value;
		const l_name = (document.getElementById('last_name') as HTMLInputElement).value;
		const email = (document.getElementById('email') as HTMLInputElement).value;
		const tel = (document.getElementById('tel') as HTMLInputElement).value;
		const booking: BookedEvent = {
			f_name: f_name,
			l_name: l_name,
			email: email,
			tel: tel,
			event: event
		};

		if (!Array.from($booked).some((e) => e.event.id == event.id)) {
			$booked = new Set([...$booked, booking]);
		}
		is_booked = true;
	};

	const removeBooking = (e: Event) => {
		e.stopPropagation();
		e.preventDefault();
		$booked = new Set([...$booked].filter((e) => e.event.id !== event.id));
		is_booked = false;
	};
</script>

<form class="flex flex-col">
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<div>
			<Label for="first_name">Förnamn</Label>
			<Input
				type="text"
				id="first_name"
				disabled={is_booked}
				placeholder="Joel"
				value={f_name}
				required
			/>
		</div>

		<div>
			<Label for="last_name">Efternamn</Label>
			<Input
				type="text"
				id="last_name"
				disabled={is_booked}
				placeholder="Joelsson"
				value={l_name}
				required
			/>
		</div>

		<div>
			<Label for="email">Emejl</Label>
			<Input
				type="email"
				id="email"
				disabled={is_booked}
				placeholder="joel@joel.se"
				value={email}
				required
			/>
		</div>

		<div>
			<Label for="tel">Telefonnummer</Label>
			<Input
				type="tel"
				id="tel"
				disabled={is_booked}
				placeholder="0703180710"
				value={tel}
				required
			/>
		</div>
	</div>
	{#if !is_booked}
		<Button type="submit" color="blue" on:click={handleSubmit}>Boka</Button>
	{:else}
		<Button type="submit" color="blue" on:click={removeBooking}>Ångra</Button>
	{/if}
</form>
