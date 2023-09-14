<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, ColorInput, Tag } from '@/lib/components';
	import { getStorageItem } from '@/lib/utils';
	import { settings } from '@/lib/stores';

	export let open = false;

	let tags: Record<string, { bgColor: string; textColor: string }>;

	let selectVal = 'createANewTag';

	let tag = { name: 'Preview', bgColor: 'royalblue', textColor: 'white' };

	$: selectVal === 'createANewTag'
		? { name: 'Preview', bgColor: 'royalblue', textColor: 'white' }
		: (tag = {
				name: selectVal,
				bgColor: $settings.tags[selectVal]?.bgColor ?? 'royalblue',
				textColor: $settings.tags[selectVal]?.textColor ?? 'white'
		  });

	$: if (open)
		getStorageItem('tags', {}).then((value) => {
			tags = value;
		});

	const dispatch = createEventDispatcher<{ tagSubmit: string }>();
</script>

<Modal bind:open height="full">
	<svelte:fragment slot="header">Assign a tag</svelte:fragment>
	<svelte:fragment slot="content">
		<form
			class="flex h-full w-full flex-col justify-around gap-4"
			on:submit|preventDefault={() => {
				if (selectVal === 'createANewTag') {
					const tags = $settings.tags;

					tags[tag.name] = {
						bgColor: tag.bgColor,
						textColor: tag.textColor
					};

					settings.changeSetting('tags', tags);

					dispatch('tagSubmit', tag.name);
				} else dispatch('tagSubmit', selectVal);

				open = false;
			}}
		>
			<select
				name="tags"
				id="tags"
				class="rounded-md bg-neutral-5 p-1 text-neutral-content"
				bind:value={selectVal}
			>
				<option value={'createANewTag'}>Create new</option>
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

			{#if selectVal === 'createANewTag'}
				<div class="flex flex-col gap-2">
					<label>
						Name:
						<input
							type="text"
							minlength="1"
							maxlength="12"
							placeholder="e.g. Personal"
							class="rounded-md px-2 py-1"
							value={tag.name}
							on:input={(event) => {
								const value = event.currentTarget.value;

								if (value.length < 1 || value.length > 12)
									return (event.currentTarget.value = tag.name);

								tag.name = value;
							}}
						/></label
					>
					<ColorInput bind:color={tag.bgColor}>Background:</ColorInput>
					<ColorInput bind:color={tag.textColor}>Text:</ColorInput>
				</div>
			{/if}

			<span class="flex gap-2">
				Preview:
				<Tag
					bind:name={tag.name}
					bind:bgColor={tag.bgColor}
					bind:textColor={tag.textColor}
				/>
			</span>

			<button class="rounded-md bg-primary px-2 py-1 hover:bg-primary-focus"
				>Submit</button
			>
		</form>
	</svelte:fragment>
</Modal>
