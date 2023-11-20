<script lang="ts">
	import { Button, Dropdown, Chevron, Checkbox, Radio } from 'flowbite-svelte';
	import {selectedOrganizers, selectedTimes} from './stores';

	const times = ['Lunch', 'Eftermiddag', 'Kväll']
	const orgs = ['P6', 'Akademiska Föreningen','Boelspexarna', 'Kuratorskollegiet', 'Amnesty Lund Student Group', 'Samhällsvetarkåren vid Lunds universitet', 'Lunds Nation', 'Göteborgs Nation', 'Malmö Nation', 'Kalmar Nation', 'Helsingkrona Nation', 'Sydskånska Nationen', 'Wermlands Nation', 'Västgöta Nation', 'Östgöta Nation', 'Blekingska Nationen', 'Hallands Nation'];

	const handletoggle = (e:Event) => {
		//If the checkbox is checked, add it to the store
		if((e.target as HTMLInputElement).checked){
			$selectedOrganizers = new Set([...$selectedOrganizers, (e.target as HTMLInputElement).value]);
		} else {
			$selectedOrganizers = new Set([...$selectedOrganizers].filter((x) => x !== (e.target as HTMLInputElement).value))
		}
	}

	const handleTimeToggle = (e:Event) => {
		if((e.target as HTMLInputElement).checked){
			$selectedTimes = new Set([ (e.target as HTMLInputElement).value])
		} else {
			$selectedTimes = new Set([...$selectedTimes].filter((x) => x !== (e.target as HTMLInputElement).value))
		}
	}

	const restoreTimeFilter = () => {
		$selectedTimes = new Set();
	}
</script>

<Button color="light"><Chevron>Nationer</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	{#each orgs as org}
		<li>
			<Checkbox value={org} checked={$selectedOrganizers.has(org)} on:change={handletoggle}>{org}</Checkbox>
		</li>
	{/each}
</Dropdown>

<Button color="light"><Chevron>Tid</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	{#each times as time}
		<li>
			<Checkbox value={time} checked={$selectedTimes.has(time)} on:change={handleTimeToggle}>{time}</Checkbox>
		</li>
	{/each}
	<Button on:click={restoreTimeFilter}>Clear</Button>
</Dropdown>
