<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
	import Dropdown from './Dropdown.svelte';
	import HeartIcon from './HeartIcon.svelte';

	const height = 20;
</script>

<Navbar
	let:hidden
	let:toggle
	navClass="h-{height} fixed w-full top-0 flex align-center dark:bg-slate-800 z-20 drop-shadow-md"
>
	<NavBrand href="/" />
	<NavHamburger on:click={toggle} />
	<div>
		<Dropdown />
	</div>
	<div class="flex justify-between gap-2">
		<Button color="light" href="/">Alla event</Button>
		<Button color="light" href="/saved" class="flex align-center gap-2">
			<HeartIcon size={6} />
			Sparade
		</Button>
		<DarkMode class="dark:text-white" />
	</div>
</Navbar>

<!-- This fixes EventList top padding -->
<div class="h-{height} border-2" />
