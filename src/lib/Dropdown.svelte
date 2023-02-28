<script lang="ts">
	import { Button, Dropdown, DropdownItem, Chevron, Checkbox } from 'flowbite-svelte';
	import type { Event } from './types';
	//export let event: Event;
</script>

<Button><Chevron>Nationer</Chevron></Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	<li>
		<Checkbox>Lunds Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Göteborgs Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Malmö Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Kalmars Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Helsingkrona Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Sydskånska Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Wermlands Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Västgöta Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Östgöta Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Blekingska Nation</Checkbox>
	</li>
	<li>
		<Checkbox>Hallands Nation</Checkbox>
	</li>
</Dropdown>
