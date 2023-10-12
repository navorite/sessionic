<script lang="ts">
	import { tooltip } from '@/lib/utils';

	export let bgColor: string = 'royalblue';
	export let textColor: string = 'white';
	export let name: string;

	let className = '';
	export { className as class };
</script>

<span
	style:background-color={bgColor}
	style:color={textColor}
	class="inline-block h-full w-full max-w-[7rem] cursor-default overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md bg-primary px-1 py-0.5 text-center text-xs font-semibold text-white {className}"
	use:tooltip={{ title: name }}
>
	{name}
</span>
