<script lang="ts">
	import FilterIcon from './icons/FilterIcon.svelte';
	import CheckboxButton from './CheckboxButton.svelte';
	import { selectedOrganizers, selectedTimes, organizers } from './stores';
	import Modal from './Modal.svelte';

	let visible: boolean;
	let toggle = () => (visible = !visible);

	const times = ['Lunch', 'Eftermiddag', 'Kväll'];
	let orgs: string[] = [];
	$: {
		orgs = [...$organizers];
	}

	const handletoggle = (checked: boolean, value: string) => {
		//If the checkbox is checked, add it to the store
		if (checked) {
			$selectedOrganizers = new Set([...$selectedOrganizers, value]);
		} else {
			$selectedOrganizers = new Set([...$selectedOrganizers].filter((x) => x !== value));
		}
	};

	const handleTimeToggle = (checked: boolean, value: string) => {
		if (checked) {
			$selectedTimes = new Set([...$selectedTimes, value]);
		} else {
			$selectedTimes = new Set([...$selectedTimes].filter((x) => x !== value));
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
	<p class="headingText">Filtrera</p>
	<div>
		<p class="subheadingText">Tid</p>
		<div class="buttonsList">
			{#each times as time}
				<CheckboxButton
					value={time}
					checked={$selectedTimes.has(time)}
					handleToggle={handleTimeToggle}
				>
					{time}
				</CheckboxButton>
			{/each}
		</div>
		<p class="subheadingText">Nation</p>
		<div class="buttonsList">
			{#each orgs as org}
				<CheckboxButton
					value={org}
					checked={$selectedOrganizers.has(org)}
					handleToggle={handletoggle}
				>
					{org}
				</CheckboxButton>
			{/each}
		</div>
	</div>
</Modal>

<style>
	.headingText {
		font-weight: bold;
		text-decoration: underline;
		font-size: xx-large;
		color: #111827;
	}

	.subheadingText {
		margin-top: 12px;
		margin-bottom: 6px;
		font-weight: bold;
		color: #111827;
	}

	.buttonsList {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
