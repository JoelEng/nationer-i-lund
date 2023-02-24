<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'

	import { DarkMode } from 'flowbite-svelte';
  </script>



<Navbar let:hidden let:toggle>
    <NavBrand href="/">
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        <NavLi href="/" active={true}>Home</NavLi>
    </NavUl>
    <div class="flex justify-between">
        <DarkMode class="dark:text-white" />
    </div>
  </Navbar>