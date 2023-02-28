<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import Dropdown from './Dropdown.svelte';

	const height = 20;
</script>

<Navbar
	let:hidden
	let:toggle
	navClass="h-{height} fixed w-full top-0 flex align-center dark:bg-slate-800 z-20 drop-shadow-md"
>
	<NavBrand href="/" />
	<NavHamburger on:click={toggle} />
	<Dropdown />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
	</NavUl>
	<div class="flex justify-between">
		<DarkMode class="dark:text-white" />
	</div>
</Navbar>

<!-- This fixes EventList top padding -->
<div class="h-{height} border-2" />
