<script lang="ts">
	import Modal from './Modal.svelte';
	import AboutIcon from './icons/AboutIcon.svelte';

	let visible = false;
	let toggle = () => (visible = !visible);
</script>

<button on:click={() => (visible = true)}>
	<AboutIcon />
</button>

<Modal {visible} {toggle}>
	Skapad med kärlek och hårda droger
	<div />
	<a href="https://github.com/JoelEng/nationer-i-lund" target="_blank">repo</a>
</Modal>

