<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal } from '@/lib/components';
	import { getStorageItem } from '@/lib/utils';

	export let open = false;

	let tags: Record<string, { bgColor: string; textColor: string }>;

	$: if (open)
		getStorageItem('tags', {}).then((value) => {
			tags = value;
		});

	const dispatch = createEventDispatcher<{ tagSubmit: string }>();
</script>

<Modal bind:open height="12rem">
	<svelte:fragment slot="header">Select a tag</svelte:fragment>
	<svelte:fragment slot="content">
		<form
			class="flex h-full w-full flex-col justify-around"
			on:submit|preventDefault={(event) => {
				const result = new FormData(event.currentTarget);

				const tag = result.getAll('tags')[0];

				if (!tag || typeof tag !== 'string') return;

				dispatch('tagSubmit', tag);

				open = false;
			}}
		>
			<select name="tags" id="tags" class="rounded-md p-1">
				{#if tags}
					{#each Object.keys(tags) as tag}
						<option
							style:background-color={tags[tag]?.bgColor}
							style:color={tags[tag]?.textColor}
							value={tag}>{tag}</option
						>
					{/each}
				{/if}
			</select>
			<button class="rounded-md bg-primary px-2 py-1 hover:bg-primary-focus"
				>Submit</button
			>
		</form>
	</svelte:fragment>
</Modal>
