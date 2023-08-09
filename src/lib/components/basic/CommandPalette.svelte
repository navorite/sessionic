<script lang="ts">
	import { currentSession, sessions } from '@/lib/stores';
	import { Modal } from '@/lib/components';

	export let open = false;

	$: selected = sessions.selection;

	const commands = [
		{
			title: 'Save current session',
			action: () => sessions.add($currentSession)
		},
		{
			title: 'Delete selected session',
			action: () => sessions.remove($selected)
		},
		{ title: 'Delete all sessions', action: sessions.removeAll }
	];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Modal bind:open>
	<ul slot="content" class="flex flex-col gap-2 font-semibold">
		{#each commands as command}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class="hover:bg-primary-5 cursor-pointer rounded-md px-4 py-2"
				on:click={() => {
					command.action();
					open = false;
				}}
			>
				{command.title}
			</li>
		{/each}
	</ul>
</Modal>
