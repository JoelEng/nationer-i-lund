<script lang="ts">
	import HeartIcon from './icons/HeartIcon.svelte';
	import { liked } from './stores';
	import type { Event as NationEvent } from './types';

	export let size = 8;
	export let event: NationEvent;

	$: filled = Array.from($liked).some((e) => e.id == event.id);

	const handleClick = (e: Event) => {
		e.stopPropagation();
		filled = !filled;

		// Add to and remove from the set of liked events
		if (filled && !Array.from($liked).some((e) => e.id == event.id)) {
			$liked = new Set([...$liked, event]);
		} else {
			$liked = new Set([...$liked].filter((e) => e.id != event.id));
		}
	};
</script>

<button on:click={handleClick}>
	<HeartIcon {filled} {size} />
</button>
