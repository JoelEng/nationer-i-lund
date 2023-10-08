<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let visible: boolean;
	export let toggle: () => void;

	let container: HTMLElement;
	$: modalType = window.innerWidth > 600 ? 'modal' : 'sheet';

	let scrollTop: any = null;

	function disableScroll() {
		scrollTop = window.scrollY || window.document.documentElement.scrollTop;
		window.onscroll = function () {
			window.scrollTo(0, scrollTop);
		};
	}

	$: if (visible) {
		disableScroll();
	} else {
		window.onscroll = function () {};
	}

	let touchstartY = 0;
	const touchstart = (e: TouchEvent) => {
		touchstartY = e.touches[0].clientY;
	};

	const touchmove = () => {
		scrollTop = window.scrollY || window.document.documentElement.scrollTop;
		window.scrollTo(0, scrollTop);
	};

	const touchend = (e: TouchEvent) => {
		const touchY = e.changedTouches[0].clientY;
		const touchDiff = touchY - touchstartY;
		if (touchDiff > 100 && container.scrollTop <= 0) {
			toggle();
			e.preventDefault();
		}
	};
</script>

{#if visible}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class={`container ${modalType == 'sheet' && 'sheetContainer'}`}
		on:click={toggle}
		on:keydown={toggle}
		bind:this={container}
		out:fade={{ duration: 500 }}
	>
		{#if modalType == 'sheet'}
			<div class="filler" />
		{/if}
		<div
			class={modalType}
			transition:fly={{ x: 0, y: 500, opacity: 1 }}
			on:click|stopPropagation
			on:keydown|stopPropagation
			on:touchstart={touchstart}
			on:touchmove={touchmove}
			on:touchend={touchend}
		>
			{#if modalType == 'sheet'}
				<div class="handlebar" />
			{/if}
			<slot />
		</div>
	</div>
{/if}

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100lvh;
		z-index: 100;
		background: rgba(100, 100, 100, 0.2);
		backdrop-filter: blur(4px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: scroll;
		overflow-x: hidden;
		overscroll-behavior: contain;
		animation: fadeIn 0.5s;
		perspective: 1000;
		-webkit-perspective: 1000;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	@keyframes fadeIn {
		0% {
			backdrop-filter: blur(0px);
			background: none;
		}
		/* 100% {
			backdrop-filter: blur(4px);
		} */
	}

	.filler {
		height: 100%;
	}

	.sheetContainer {
		justify-content: flex-start;
		padding-top: 400px;
		height: calc(100lvh + 400px); /* match with sheet padding-bottom */
	}

	.modal {
		position: relative;
		width: 90%;
		max-width: 800px;
		background: white;
		border-radius: 20px;
		padding: 40px;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.sheet {
		position: relative;
		min-height: 200px;
		width: 100%;
		/* max-height: 100%; */
		background: white;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		padding: 20px;
		padding-top: 14px;
		padding-bottom: calc(100px + 400px); /* match with sheetcontainer height */
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}

	.handlebar {
		height: 5px;
		background: rgba(100, 100, 100, 0.1);
		width: 50px;
		align-self: center;
		border-radius: 1000px;
		margin-bottom: 10px;
	}

	.divider {
		width: 70%;
		border-top: 1px solid lightgray;
		align-self: center;
		margin-top: 20px;
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
