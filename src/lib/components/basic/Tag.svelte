<script lang="ts">
	import { tooltip } from '@/lib/utils';

	export let bgColor: string = 'royalblue';
	export let textColor: string = 'white';
	export let name: string;

	let className = '';
	export { className as class };
</script>

<div
	style:background-color={bgColor}
	style:color={textColor}
	class="session-card group relative w-28 {className}"
	use:tooltip={{ title: name }}
>
	<span
		class="mx-auto overflow-hidden overflow-ellipsis whitespace-nowrap px-4 text-xs"
		>{name}</span
	>
	<slot />
</div>
