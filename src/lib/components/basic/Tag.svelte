<script lang="ts">
	import { IconButton } from '@/lib/components';

	export let bgColor: string = 'royalblue';
	export let textColor: string = 'white';
	export let name: string;
</script>

<span
	style:background-color={bgColor}
	style:color={textColor}
	class="session-card group relative ml-auto bg-primary text-white hover:bg-primary"
	aria-label="Tag"
>
	{name}
	<span
		class="hidden rounded-md bg-error hover:bg-error-focus group-hover:block"
	>
		<IconButton
			icon="close"
			class="text-sm text-white"
			title="Remove tag"
			on:click
		/>
	</span>
</span>
