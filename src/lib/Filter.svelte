<script lang="ts">
	import Dropdown from './Dropdown.svelte';
import FilterIcon from './icons/FilterIcon.svelte';
	import Modal from './Modal.svelte';

	let visible: boolean;
	let toggle = () => (visible = !visible);

</script>

<button on:click={() => (visible = true)}>
	<FilterIcon />
</button>

<Modal {visible} {toggle}>
	Filtrera
	<Dropdown /> 

</Modal>
