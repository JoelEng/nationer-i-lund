<script lang="ts">
	export let checked: boolean;
	export let value: string;
	export let handleToggle: (checked: boolean, value: string) => void;

	const toggleChecked = (e: Event) => {
		checked = !checked;
		handleToggle(checked, value);
	};
</script>

<button class={checked ? 'checked' : ''} on:click={toggleChecked}>{value}</button>

<style>
	button {
		padding: 0.4rem 1rem;
		border-radius: 10px;
		border: 1px solid lightgray;
	}

	.checked {
		--color: rgb(140, 197, 255);
		background: var(--color);
		border-color: var(--color);
		color: rgba(0, 0, 0, 0.5);
	}
</style>
