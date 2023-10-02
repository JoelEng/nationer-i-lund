<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
	import Dropdown from './Dropdown.svelte';
	import HeartIcon from './icons/HeartIcon.svelte';
	import { DateInput } from 'date-picker-svelte';
	import { indexDay } from './stores';

	const height = 20;
	$: showSaved = $page.route.id == '/saved';

	const toggleSaved = () => {
		if (showSaved) {
			goto('/');
		} else {
			goto('/saved');
		}
	};

	const handleDatePicker = () => {
		$indexDay = day;
	};
	let day: Date;
</script>

<Navbar
	let:hidden
	let:toggle
	navClass="h-{height} fixed w-full top-0 flex align-center dark:bg-slate-800 z-20 drop-shadow-md"
>
	<NavBrand href="/" />
	<NavHamburger on:click={toggle} />
	<div class="flex gap-2 items-center">
		<DateInput
			closeOnSelection
			bind:value={day}
			on:select={handleDatePicker}
			format="dd/MM"
			placeholder="Välj datum"
		/>
		<Dropdown />
	</div>
	<div class="flex justify-between gap-2">
		<Button
			color={showSaved ? 'dark' : 'light'}
			on:click={toggleSaved}
			class="flex align-center gap-2 {showSaved && 'dark:bg-white dark:text-black'}"
		>
			<HeartIcon size={6} filled={showSaved} />
			Sparade
		</Button>
		<DarkMode class="dark:text-white" />
	</div>
</Navbar>

<!-- This fixes EventList top padding -->
<div class="h-{height} border-2" />
