<script lang="ts">
	import { IconButton } from '@/lib/components';

	export let open = false;

	export let height = '10rem';

	export let width = 'fit-content';

	let dialogEl: HTMLDialogElement;

	$: open ? dialogEl?.showModal() : dialogEl?.close();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialogEl}
	class="max-h-lg max-w-3xl rounded-md border-2 border-solid border-neutral-5 bg-transparent text-white outline-none backdrop-blur"
	on:mousedown|self={() => (open = false)}
	on:keydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
>
	<div
		role="none"
		style:height
		style:width
		class="flex h-full min-h-[10rem] w-full min-w-[16rem] flex-col gap-4 px-4 py-2 text-base"
		on:click|stopPropagation
	>
		{#if $$slots.header}
			<div class="flex items-center">
				<h3 class="font-bold">
					<slot name="header" />
				</h3>

				<!-- TODO: add tooltip on modals -->
				<IconButton
					icon="close"
					class="ml-auto text-xl hover:text-error-focus"
					on:click={() => (open = false)}
				/>
			</div>
		{/if}

		<slot name="content" />

		{#if $$slots.footer}
			<div class="ml-auto mt-auto flex gap-2 font-semibold">
				<button
					class="rounded-md bg-neutral-4 px-4 py-1 font-medium text-neutral-content hover:bg-neutral-5"
					type="button"
					on:click={() => (open = false)}>Cancel</button
				>
				<slot name="footer" />
			</div>
		{/if}
	</div>
</dialog>

<style>
	dialog::backdrop {
		backdrop-filter: blur(1px);
		background-color: rgba(0, 0, 0, 0.6);
	}
</style>
