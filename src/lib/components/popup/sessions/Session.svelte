<script lang="ts">
	import type { ESession, EWindow } from '@/lib/types';
	import { createEventDispatcher } from 'svelte';
	import { settings, filterOptions, sessions } from '@/lib/stores';
	import { ListItem, IconButton, Tag } from '@/lib/components';
	import {
		tooltip,
		sendMessage,
		markResult,
		sessionsDB,
		getRelativeTime
	} from '@/lib/utils';
	import type { UUID } from 'crypto';

	export let session: ESession;

	$: selected = sessions.selection;

	const dispatch = createEventDispatcher();

	$: title = $filterOptions?.query.trim()
		? markResult(session?.title, $filterOptions?.query, {
				case_sensitive: false
		  })
		: session?.title;

	async function openSession() {
		if (!session.windows[0]?.tabs?.length)
			session.windows = (await sessionsDB.loadSessionWindows(
				session.id as UUID
			)) as EWindow[];

		sendMessage({
			message: 'openSession',
			session,
			discarded: $settings.discarded
		});

		session.windows = { length: session.windows.length } as EWindow[];
	}
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
			on:click|stopPropagation={openSession}
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
				icon={session?.tags ? 'untag' : 'tag'}
				title="Add tag"
				class="text-xl hover:text-primary-focus"
				on:click={() => {
					if (!session?.tags) return dispatch('tagsModal');

					delete session.tags;

					sessions.put(session);
				}}
			/>

			<IconButton
				icon="delete"
				title="Delete"
				class="text-xl text-error hover:text-error-focus"
				on:click={() => dispatch('deleteModal')}
			/>
		{/if}
	</div>

	<div class="mt-2 flex gap-2">
		<div
			class="session-card"
			use:tooltip={{
				title: `${session?.windows?.length} Window${
					session?.windows?.length > 0 ? 's' : ''
				}`
			}}
		>
			<IconButton icon="window" class="text-sm" role="img" />
			{session?.windows?.length}
		</div>

		<div
			class="session-card"
			use:tooltip={{
				title: `${session?.tabsNumber} Tab${session?.tabsNumber > 0 ? 's' : ''}`
			}}
		>
			<IconButton icon="tab" class="text-sm" role="img" />
			{session?.tabsNumber}
		</div>

		{#if session?.dateSaved}
			<div
				class="session-card"
				use:tooltip={{
					title: `Saved at ${new Date(session.dateSaved).toLocaleString(
						navigator.language,
						{
							dateStyle: 'short',
							timeStyle: 'short'
						}
					)}`
				}}
			>
				<IconButton icon="savedate" class="text-sm" role="img" />
				{getRelativeTime(session.dateSaved)}
			</div>
		{/if}

		{#if session.tags}
			{@const tag = $settings.tags[session.tags]}
			<Tag
				name={session.tags}
				bgColor={tag?.bgColor}
				textColor={tag?.textColor}
				class="ml-auto"
			/>
		{/if}
	</div>
</ListItem>
