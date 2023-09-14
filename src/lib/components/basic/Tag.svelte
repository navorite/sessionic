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
	<slot />
</span>
