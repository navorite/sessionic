<script lang="ts">
	import { isFirefox } from '@constants/env';

	import { afterUpdate } from 'svelte';

	import { getAvailableViewport } from '@utils/viewport';

	export { className as class };
	let className: string = '';

	type T = $$Generic;

	export let items: T[];

	export let start: number = 0;
	export let end: number = 0;

	export function scrollTo(x: number, y: number, behavior: ScrollBehavior = 'smooth') {
		divEl?.scrollTo({ top: y, left: x, behavior: behavior });
	}

	export let reversed = false;

	let scrollBarPadding = '0';

	afterUpdate(() => {
		if (isFirefox) {
			scrollBarPadding = divEl?.scrollHeight > divEl?.clientHeight ? '1rem' : '0';
			return;
		}

		scrollBarPadding = divEl?.scrollHeight > divEl?.clientHeight ? '0.5rem' : '0';
	});

	let divEl: HTMLDivElement;
	let timeout: string | number | NodeJS.Timeout;

	$: viewport = getAvailableViewport(divEl, items?.length, 300);
	$: (start = viewport.start), (end = viewport.end);

	function handleScroll() {
		//TODO: enhance scrolling performance and memory usage
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			viewport = getAvailableViewport(divEl, items?.length, 300);
			clearTimeout(timeout);
		}, 5);
	}
</script>

{#if items && items.length}
	<div
		bind:this={divEl}
		style:padding-right={scrollBarPadding}
		class="overflow-y-auto {className}"
		on:scroll={handleScroll}
	>
		<ul
			style:padding-top="{viewport.paddingTop}px"
			style:padding-bottom="{viewport.paddingBottom}px"
		>
			{#each { length: end - start } as _, i}
				{@const item = reversed ? items[items.length - 1 - i - start] : items[i + start]}
				<slot {item} />
			{/each}
		</ul>
	</div>
{/if}
