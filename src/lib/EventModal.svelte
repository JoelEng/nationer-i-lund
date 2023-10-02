<script lang="ts">
	import Location from './icons/Location.svelte';
	import Mail from './icons/Mail.svelte';
	import type { Event } from './types';

	enum Time {
		Past,
		Present,
		Future
	}

	export let event: Event;
	export let time: Time;
	export let timeString: string;
	export let visible: boolean;
	export let toggle: () => void;

	let modal: HTMLElement;
	$: modalType = window.innerWidth > 600 ? 'modal' : 'sheet';

	const drag = (e: TouchEvent) => {};
</script>

{#if visible}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class={`background ${modalType == 'sheet' && 'sheetBackground'}`}
		on:click={toggle}
		on:keydown={toggle}
	>
		{#if modalType == 'sheet'}
			<div class="filler" />
		{/if}
		<div
			class={modalType}
			on:click|stopPropagation
			on:keydown|stopPropagation
			on:touchmove={drag}
			bind:this={modal}
		>
			<p class="organizer">{event.organizer.name}</p>
			<p class="title">{event.summary}</p>
			<p class="time">{timeString}</p>
			<div class="divider" />
			<div class="contents">
				<div class="buttonContainer">
					{#if event.location}
						<a
							class="button"
							style:background="rgb(139, 255, 224)"
							target="_blank"
							href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
						>
							<Location /> hitta hit
						</a>
					{/if}
					{#if event.organizer.email}
						<a class="button" target="_blank" href={`mailto:${event.organizer.email}`}>
							<Mail /> maila nationen
						</a>
					{/if}
				</div>
				<p class="description">{event.description}</p>
			</div>
			{#if time == Time.Present}
				<div
					class="absolute -top-2 -right-2 text-white bg-red-500 py-1 px-4 rounded-lg border-white border-2 font-extrabold"
				>
					Just nu
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 100;
		background: rgba(100, 100, 100, 0.2);
		backdrop-filter: blur(2px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: scroll;
	}

	.filler {
		height: 100%;
	}

	.sheetBackground {
		justify-content: flex-start;
		padding-top: 200px;
		overflow-y: scroll;
	}

	.modal {
		position: relative;
		width: 90%;
		max-width: 800px;
		background: white;
		border-radius: 20px;
		padding: 20px;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.sheet {
		min-height: 200px;
		width: 100%;
		/* max-height: 100%; */
		background: white;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		padding: 20px;
		padding-bottom: 60px;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}

	.title {
		font-size: 1.4rem;
		font-weight: bolder;
		text-align: center;
	}

	.organizer {
		font-size: 1rem;
		font-weight: lighter;
		font-style: italic;
		text-align: center;
	}

	.time {
		font-size: 1.05rem;
		font-weight: 300;
		text-align: center;
	}

	.divider {
		width: 70%;
		border-top: 1px solid lightgray;
		align-self: center;
		margin-top: 20px;
	}

	.contents {
		display: flex;
		flex-direction: column;
		/* overflow-y: scroll; */
		/* overflow-x: hidden; */
		gap: 12px;
		padding-top: 20px;
	}

	.button {
		width: fit-content;
		padding: 6px 14px;
		border-radius: 200px;
		background: rgb(139, 187, 255);
		color: rgba(0, 0, 0, 0.5);
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.buttonContainer {
		display: flex;
		gap: 8px;
	}
</style>
