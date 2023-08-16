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
	<input
		type="checkbox"
		aria-hidden="true"
		bind:checked
		on:change
		class="hidden"
	/>
	<span
		tabindex="0"
		role="switch"
		aria-checked={checked}
		aria-label={title}
		class="before:fade relative mr-1 block h-6 w-11 rounded-full bg-neutral-content/10 before:absolute before:left-0.5 before:top-0.5 before:block before:h-5 before:w-5 before:rounded-full before:bg-neutral-1 before:content-['']"
	/>
	{title}
</label>

<style>
	input:checked + span {
		background-color: hsl(var(--primary));
	}

	input:checked + span:before {
		translate: 100% 0%;
	}
</style>
