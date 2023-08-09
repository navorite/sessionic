<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal } from '@/lib/components';

	export let type = 'Delete' as const;

	export let open: boolean;

	const dispatch = createEventDispatcher();
</script>

<Modal bind:open>
	<svelte:fragment slot="header">{type} session</svelte:fragment>
	<p slot="content" class="font-semibold">
		Are you sure you wanna {type.toLowerCase()} this session?
	</p>
	<button
		slot="footer"
		type="button"
		title="{type} session"
		class="rounded-md bg-error px-4 py-1 hover:bg-error-focus"
		on:click={() => {
			dispatch('deleteAction');
		}}>{type}</button
	>
</Modal>
