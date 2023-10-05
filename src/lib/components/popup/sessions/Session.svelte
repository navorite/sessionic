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
				icon="delete"
				title="Delete"
				class="text-xl text-error hover:text-error-focus"
				on:click={() => dispatch('deleteModal')}
			/>
		{/if}
	</div>

	<div class="mt-2 flex items-center gap-2">
		<div
			class="session-card"
			use:tooltip={{
				title: `${session?.windows?.length} Window${
					session?.windows?.length > 0 ? 's' : ''
				}`
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

		{#if session?.dateSaved}
			<span class="session-card" use:tooltip={{ title: 'Date saved' }}>
				{getRelativeTime(session.dateSaved)}
			</span>
		{/if}

		{#if session.tags}
			{@const tag = $settings.tags[session.tags]}
			<Tag
				name={session.tags}
				bgColor={tag?.bgColor}
				textColor={tag?.textColor}
				class="ml-auto"
				><span
					class="hidden rounded-md bg-error hover:bg-error-focus group-hover:block"
				>
					<IconButton
						icon="close"
						class="text-sm text-white"
						title="Remove tag"
						on:click={() => {
							delete session.tags;

							sessions.put(session);
						}}
					/>
				</span></Tag
			>
		{:else}
			<IconButton
				icon="tag"
				title="Add tag"
				class="ml-auto text-xl hover:text-primary-focus"
				on:click={() => {
					dispatch('tagsModal');
				}}
			></IconButton>
		{/if}
	</div>
</ListItem>
