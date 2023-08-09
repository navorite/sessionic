<script lang="ts">
	export { className as class };
	let className = '';

	let hover = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	class={className}
	on:click
	on:mouseenter={() => {
		hover = true;
	}}
	on:mouseleave={() => {
		hover = false;
	}}
>
	<slot {hover} />
</li>
