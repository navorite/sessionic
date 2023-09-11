<script lang="ts">
	import { currentSession, filtered, sessions } from '@/lib/stores';
	import {
		VirtualList,
		Windows,
		InputModal,
		ActionModal,
		Session,
		CurrentSession
	} from '@/lib/components';

	$: selection = sessions.selection;

	$: if ($selection && typeof scrollToIndex !== 'undefined' && !isScrolled) {
		isScrolled = true;
		scrollToIndex($sessions.indexOf($selection));
	}

	let modalShow = false;
	let modalType: 'Save' | 'Rename' = 'Rename';

	let actionShow = false;

	let scrollToIndex: (index: number) => void;

	let isScrolled = false;
</script>

<div class="mt-2 flex h-full max-h-[90vh] w-full gap-2 overflow-hidden">
	<div class="flex h-full max-w-xs flex-1 flex-col">
		<CurrentSession
			on:click={() => {
				modalType = 'Save';
				modalShow = true;
			}}
		/>

		{#if $filtered}
			<VirtualList
				reversed={true}
				items={$filtered}
				let:item
				class="flex-1"
				bind:scrollToIndex
			>
				<Session
					session={item}
					on:renameModal={() => {
						modalType = 'Rename';
						modalShow = true;
					}}
					on:deleteModal={() => (actionShow = true)}
				/>
			</VirtualList>
		{/if}
	</div>

	<Windows class="flex-1" />
</div>

<InputModal
	bind:open={modalShow}
	type={modalType}
	on:inputSubmit={async (event) => {
		if (modalType === 'Rename' && $selection.title !== event.detail) {
			$selection.title = event.detail;
			await sessions.put($selection);
		} else if (modalType === 'Save') {
			$currentSession.title = event.detail;

			await sessions.add($currentSession);

			if ($sessions.length) scrollToIndex($sessions.length);
		}

		modalShow = false;
	}}
/>

<ActionModal
	bind:open={actionShow}
	on:deleteAction={async () => {
		await sessions.remove($selection);

		selection.select($currentSession);

		actionShow = false;
	}}
/>
