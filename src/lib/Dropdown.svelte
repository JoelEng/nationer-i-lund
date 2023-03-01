<script lang="ts">
	import { Button, Dropdown, DropdownItem, Chevron, Checkbox } from 'flowbite-svelte';
	import {selectedOrganizers} from './stores';

	const orgs = ['Lunds Nation', 'Göteborgs Nation', 'Malmö Nation', 'Kalmar Nation', 'Helsingkrona Nation', 'Sydskånska Nationen', 'Wermlands Nation', 'Västgöta Nation', 'Östgöta Nation', 'Blekingska Nationen', 'Hallands Nation'];

	const handletoggle = (e:Event) => {
		//If the checkbox is checked, add it to the store
		if((e.target as HTMLInputElement).checked){
			$selectedOrganizers = new Set([...$selectedOrganizers, (e.target as HTMLInputElement).value]);
		} else {
			$selectedOrganizers = new Set([...$selectedOrganizers].filter((x) => x !== (e.target as HTMLInputElement).value))
		}
	}
</script>

<Button color="light"><Chevron>Nationer</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	{#each orgs as org}
		<li>
			<Checkbox value={org} on:change={handletoggle}>{org}</Checkbox>
		</li>
	{/each}
</Dropdown>

<Button color="light"><Chevron>Tid</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	<li>
		<Checkbox>Lunch</Checkbox>
	</li>
	<li>
		<Checkbox>Eftermiddag</Checkbox>
	</li>
	<li>
		<Checkbox>Kväll</Checkbox>
	</li>
</Dropdown>
