<script lang="ts">
	export let title: string | undefined | null = undefined;
</script>

<section class="rounded-md border-solid bg-neutral-2 p-4">
	{#if title}
		<h2 class="mb-2 text-lg font-bold">{title}</h2>
	{/if}
	<div class="flex flex-col gap-4">
		<slot />
	</div>
</section>
