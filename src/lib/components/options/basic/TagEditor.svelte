<script lang="ts">
	import { settings } from '@/lib/stores';
	import { ColorInput, IconButton } from '@/lib/components';

	$: tags = $settings.tags;

	let addedTag = { name: '', bgColor: 'royalblue', textColor: 'white' };

	function onInput(
		ev: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		tagName: keyof typeof tags
	) {
		const value = ev.currentTarget.value;

		if (value.length < 1 || value.length > 12)
			return (ev.currentTarget.value = tags[tagName]!.name!);

		tags[tagName]!.name = value;
	}

	function onChange(
		ev: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		tagName: keyof typeof tags
	) {
		const value = ev.currentTarget.value;

		tags[value] = tags[tagName]!;

		delete tags[tagName];

		settings.changeSetting('tags', tags);
	}
</script>

<table class="w-full table-fixed rounded-md">
	<caption class="mt-2 text-neutral-content/50">List of tags</caption>
	<thead>
		<tr class="border-b border-b-neutral-4/50 text-neutral-content/50">
			<td>Tag</td>
			<td>Background</td>
			<td>Text</td>
			<td>Preview</td>
			<td class="flex items-center gap-2">Action</td>
		</tr>
	</thead>
	<tbody>
		{#each Object.keys(tags) as tagName}
			<tr
				class="rounded-md border-b border-b-neutral-4/50 last:border-b-0 hover:bg-neutral-3"
			>
				<td class="flex items-center gap-2">
					<input
						type="text"
						value={tagName}
						minlength="1"
						maxlength="12"
						on:input={(ev) => onInput(ev, tagName)}
						on:change={(ev) => onChange(ev, tagName)}
						class="flex w-10 flex-1 rounded-md bg-neutral-4 p-1 text-center"
					/>
				</td>
				<td>
					<ColorInput
						bind:color={tags[tagName].bgColor}
						on:change={() => settings.changeSetting('tags', tags)}
					/>
				</td>
				<td>
					<ColorInput
						bind:color={tags[tagName].textColor}
						on:change={() => settings.changeSetting('tags', tags)}
					/>
				</td>
				<td>
					<span
						style:background-color={tags[tagName]?.bgColor}
						style:color={tags[tagName]?.textColor}
						class="session-card pointer-events-none max-w-max"
						aria-hidden="true">{tags[tagName].name || tagName}</span
					>
				</td>
				<td>
					<IconButton
						icon="delete"
						class="text-2xl text-error hover:text-error-focus"
						title="Delete tag"
						on:click={() => {
							delete tags[tagName];

							settings.changeSetting('tags', tags);
						}}
					/>
				</td>
			</tr>
		{/each}

		<tr
			class="rounded-md border-b border-b-neutral-4/50 last:border-b-0 hover:bg-neutral-3"
		>
			<td class="flex items-center gap-2">
				<input
					type="text"
					bind:value={addedTag.name}
					minlength="1"
					maxlength="12"
					class="flex w-10 flex-1 rounded-md bg-neutral-4 p-1 text-center"
				/>
			</td>
			<td>
				<ColorInput
					bind:color={addedTag.bgColor}
					on:change={() => settings.changeSetting('tags', tags)}
				/>
			</td>
			<td>
				<ColorInput
					bind:color={addedTag.textColor}
					on:change={() => settings.changeSetting('tags', tags)}
				/>
			</td>
			<td>
				<span
					style:background-color={addedTag.bgColor}
					style:color={addedTag.textColor}
					class="session-card pointer-events-none max-w-max"
					aria-hidden="true">{addedTag.name || 'Preview'}</span
				>
			</td>
			<td>
				<button
					class="max-w-max rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-focus"
					on:click={() => {
						if (addedTag.name.length < 1 || addedTag.name.length > 12) return;

						tags[addedTag.name] = {
							bgColor: addedTag.bgColor,
							textColor: addedTag.textColor
						};

						settings.changeSetting('tags', tags);

						addedTag = { name: '', bgColor: 'royalblue', textColor: 'white' };
					}}>Add tag</button
				>
			</td>
		</tr>
	</tbody>
</table>

<style>
	td {
		padding: theme('padding.2');
	}
</style>
