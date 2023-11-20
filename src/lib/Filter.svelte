<script lang="ts">
	import FilterIcon from './icons/FilterIcon.svelte';
	import { Button, Dropdown, Chevron, Checkbox, Radio } from 'flowbite-svelte';
	import { selectedOrganizers, selectedTimes, organizers } from './stores';
	import Modal from './Modal.svelte';

	let visible: boolean;
	let toggle = () => (visible = !visible);

	const times = ['Lunch', 'Eftermiddag', 'Kväll'];
	let orgs: string[] = [];
	$:{
		orgs = [...$organizers];
	}


	const handletoggle = (e: Event) => {
		//If the checkbox is checked, add it to the store
		if ((e.target as HTMLInputElement).checked) {
			$selectedOrganizers = new Set([...$selectedOrganizers, (e.target as HTMLInputElement).value]);
		} else {
			$selectedOrganizers = new Set(
				[...$selectedOrganizers].filter((x) => x !== (e.target as HTMLInputElement).value)
			);
		}
	};

	const handleTimeToggle = (e: Event) => {
		if ((e.target as HTMLInputElement).checked) {
			$selectedTimes = new Set([... $selectedTimes, (e.target as HTMLInputElement).value]);
		} else {
			$selectedTimes = new Set(
				[...$selectedTimes].filter((x) => x !== (e.target as HTMLInputElement).value)
			);
		}
	};

	const restoreTimeFilter = () => {
		$selectedTimes = new Set();
	};
</script>

<button on:click={() => (visible = true)}>
	<FilterIcon />
</button>

<Modal {visible} {toggle}>
	Filtrera
	<div>Tid</div>
	<div>
		<ul>
			{#each times as time}
				<li>
					<Checkbox value={time} checked={$selectedTimes.has(time)} on:change={handleTimeToggle}>
						{time}
					</Checkbox>
				</li>
			{/each}
		</ul>
	</div>
	Nation
	<div>
		<ul>
			{#each orgs as org}
				<li>
					<Checkbox value={org} checked={$selectedOrganizers.has(org)} on:change={handletoggle}
						>{org}</Checkbox
					>
				</li>
			{/each}
		</ul>
	</div>
</Modal>
