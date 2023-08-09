<script lang="ts">
	import { tooltip } from '@/lib/utils';

	export let title: string;
	export let checked = false;
	export let description = '';
</script>

<label
	class="flex max-w-max cursor-pointer items-center gap-2 rounded-md text-sm font-medium hover:brightness-125"
	use:tooltip={{ title: description }}
>
	<input type="checkbox" aria-hidden="true" bind:checked on:change />
	<span
		tabindex="0"
		role="switch"
		aria-checked={checked}
		aria-label={title}
		class="before:fade relative block h-6 w-11 rounded-full bg-neutral-6 before:absolute before:-left-0.5 before:block before:h-6 before:w-6 before:rounded-full before:bg-white before:content-['']"
	/>
	{title}
</label>

<style>
	input {
		display: none; /*not the best for accessibility*/
	}

	input:checked + span {
		background-color: hsl(var(--primary));
	}

	input:checked + span:before {
		translate: 100% 0%;
	}

	label:hover > span::before {
		background-color: white;
	}
</style>
