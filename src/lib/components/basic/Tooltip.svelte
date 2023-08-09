<script lang="ts">
	import { fade } from 'svelte/transition';

	export let title: string;

	export let x: number;
	export let y: number;

	export let delay = 600;
	export let duration = 100;

	export let translate: { X: number; Y: number };
</script>

<div
	inert
	role="tooltip"
	style="position:absolute;top:{y}px;left:{x}px;translate:{translate.X}% {translate.Y}%"
	in:fade|global={{ delay, duration }}
>
	{title}
</div>

<style>
	div {
		@apply pointer-events-none select-none whitespace-nowrap rounded-md bg-tooltip px-2 py-1 text-sm font-medium text-tooltip-content;
	}
</style>
