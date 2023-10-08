<script lang="ts">
	import type { Icon } from '@/lib/types';
	import { tooltip } from '@/lib/utils';

	export let icon: Icon = 'default';
	export let title: string = '';
	export let role: 'button' | 'img' = 'button';

	export { className as class };
	let className = 'text-2xl hover:text-primary-focus';

	$: src = `../../icons/${icon}.svg`;
</script>

<button
	use:tooltip={{ title }}
	{role}
	class="block h-[1em] w-[1em] cursor-pointer bg-current {role === 'img'
		? 'pointer-events-none'
		: ''} {className}"
	style:mask-image="url({src})"
	style:mask-repeat="no-repeat"
	style:mask-position="center"
	style:mask-size="cover"
	style:-webkit-mask-image="url({src})"
	style:-webkit-mask-repeat="no-repeat"
	style:-webkit-mask-position="center"
	style:-webkit-mask-size="cover"
	on:click
></button>
