<script lang="ts">
	import ListItem from '@components/basic/ListItem.svelte';
	import IconButton from '../IconButton.svelte';
	import settings, { filterOptions } from '@stores/settings';
	import { markResult } from '@utils/markResult';
	import { createEventDispatcher } from 'svelte';
	import sessions from '@stores/sessions';
	import { sendMessage } from '@utils/messages';
	import { tooltip } from '@utils/tooltip';
	import type { ESession } from '@/lib/types';

	export let session: ESession;

	$: selected = sessions.selection;

	const dispatch = createEventDispatcher();

	$: title = $filterOptions?.query.trim()
		? markResult(session?.title, $filterOptions?.query, {
				case_sensitive: false
		  })
		: session?.title;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ListItem
	let:hover
	class="session-container {$selected === session ? '!bg-primary/30' : ''}"
	on:click={() => {
		selected.select(session);
	}}
>
	<div class="session-info">
		<span
			tabindex="0"
			role="button"
			use:tooltip={{ title: 'Open' }}
			class="session-name"
			on:click={() => {
				sendMessage({
					message: 'openSession',
					session,
					discarded: $settings.discarded
				});
			}}
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html title}
		</span>

		{#if hover}
			<IconButton
				icon="rename"
				title="Rename"
				class="ml-auto text-xl hover:text-primary-focus"
				on:click={() => {
					dispatch('renameModal');
				}}
			/>

			<IconButton
				icon="delete"
				title="Delete"
				class="text-xl hover:text-error-focus"
				on:click={() => dispatch('deleteModal')}
			/>
		{/if}
	</div>

	<div class="flex items-center gap-2 py-1">
		<div
			class="session-card"
			use:tooltip={{
				title: `${session?.windows?.length} Window${session?.windows?.length > 0 ? 's' : ''}`
			}}
		>
			<IconButton icon="window" class="text-base" role="img" />
			{session?.windows?.length}
		</div>

		<div
			class="session-card"
			use:tooltip={{
				title: `${session?.tabsNumber} Tab${session?.tabsNumber > 0 ? 's' : ''}`
			}}
		>
			<IconButton icon="tab" class="text-base" role="img" />
			{session?.tabsNumber}
		</div>

		<span class="session-card ml-auto" use:tooltip={{ title: 'Date saved' }}>
			{#if session?.dateSaved}
				{@const date = new Date(session.dateSaved)}
				{date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
			{/if}
		</span>
	</div>
</ListItem>
