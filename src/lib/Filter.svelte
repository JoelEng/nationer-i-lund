<script lang="ts">
	import FilterIcon from './icons/FilterIcon.svelte';
	import { Checkbox } from 'flowbite-svelte';
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
	<p class="mb-4 font-semibold text-gray-900 dark:text-white">Filtrera</p>
	<div>
		<p class="mb-4 font-semibold text-gray-900 dark:text-white">Tid</p>
		<ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
  			{#each times as time}
  				<li>
	  				<Checkbox class="p-3" value={time} checked={$selectedTimes.has(time)} on:change={handleTimeToggle}>
		  				{time}
	  				</Checkbox>
  				</li>
			{/each}
		</ul>
		<p class="mb-4 font-semibold text-gray-900 dark:text-white">Nation</p>
		<ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600" >
			{#each orgs as org}
				<li>
					<Checkbox class="p-3" value={org} checked={$selectedOrganizers.has(org)} on:change={handletoggle}>
						{org}
					</Checkbox>
				</li>
			{/each}
		</ul>
	</div>
</Modal>
