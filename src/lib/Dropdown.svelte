<script lang="ts">
	import { Button, Dropdown, DropdownItem, Chevron, Checkbox } from 'flowbite-svelte';
	import {selectedOrganizers, selectedTime} from './stores';

	const times = ['Lunch', 'Eftermiddag', 'Kväll']
	const orgs = ['Lunds Nation', 'Göteborgs Nation', 'Malmö Nation', 'Kalmar Nation', 'Helsingkrona Nation', 'Sydskånska Nationen', 'Wermlands Nation', 'Västgöta Nation', 'Östgöta Nation', 'Blekingska Nationen', 'Hallands Nation'];

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
			$selectedTime = new Set([...$selectedTime, (e.target as HTMLInputElement).value])
		} else {
			$selectedTime = new Set([...$selectedTime].filter((x) => x !== (e.target as HTMLInputElement).value))
		}
	}

	function isInList (org:string) {
		if($selectedOrganizers.has(org)){
			return true;
		}
		else return false;
	}

	function isInTimeList (time:string) {
		if($selectedTime.has(time)){
			return true;
		}
		else return false;
	}
</script>

<Button color="light"><Chevron>Nationer</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	{#each orgs as org}
		<li>
			<Checkbox value={org} checked={isInList(org)} on:change={handletoggle}>{org}</Checkbox>
		</li>
	{/each}
</Dropdown>

<Button color="light"><Chevron>Tid</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	{#each times as time}
		<li>
			<Checkbox value={time} checked={isInTimeList(time)} on:change={handleTimeToggle}>{time}</Checkbox>
		</li>
	{/each}
</Dropdown>
