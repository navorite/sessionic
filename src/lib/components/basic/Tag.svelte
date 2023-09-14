<script lang="ts">
	export let bgColor: string = 'royalblue';
	export let textColor: string = 'white';
	export let name: string;

	let className = '';
	export { className as class };
</script>

<span
	style:background-color={bgColor}
	style:color={textColor}
	class="session-card group relative max-w-max bg-primary text-white hover:bg-primary {className}"
	aria-label="Tag"
>
	{name}
	<slot />
</span>
