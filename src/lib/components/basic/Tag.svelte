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
	class="session-card bg-primary text-white hover:bg-primary {className} group"
>
	<span
		class="cursor-default overflow-hidden overflow-ellipsis whitespace-nowrap px-1 text-xs"
		use:tooltip={{ title: name }}
	>
		{name}
	</span>
</div>
