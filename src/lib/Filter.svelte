<script lang="ts">
	import FilterIcon from './icons/FilterIcon.svelte';
	import { Button, Dropdown, Chevron, Checkbox, Radio } from 'flowbite-svelte';
	import { selectedOrganizers, selectedTime } from './stores';
	import Modal from './Modal.svelte';

	let visible: boolean;
	let toggle = () => (visible = !visible);

	const times = ['Lunch', 'Eftermiddag', 'Kväll'];
	const orgs = [
		'P6',
		'Akademiska Föreningen',
		'Boelspexarna',
		'Kuratorskollegiet',
		'Amnesty Lund Student Group',
		'Samhällsvetarkåren vid Lunds universitet',
		'Lunds Nation',
		'Göteborgs Nation',
		'Malmö Nation',
		'Kalmar Nation',
		'Helsingkrona Nation',
		'Sydskånska Nationen',
		'Wermlands Nation',
		'Västgöta Nation',
		'Östgöta Nation',
		'Blekingska Nationen',
		'Hallands Nation'
	];

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
			$selectedTime = new Set([(e.target as HTMLInputElement).value]);
		} else {
			$selectedTime = new Set(
				[...$selectedTime].filter((x) => x !== (e.target as HTMLInputElement).value)
			);
		}
	};

	const restoreTimeFilter = () => {
		$selectedTime = new Set();
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
					<Checkbox value={time} checked={$selectedTime.has(time)} on:change={handleTimeToggle}
						>{time}</Checkbox
					>
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
