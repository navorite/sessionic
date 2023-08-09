<script lang="ts">
	import IconButton from '@components/IconButton.svelte';
	import { tooltip } from '@utils/tooltip';

	export let value: string;

	let copied = false;

	let timeout: NodeJS.Timeout | null;
</script>

<button
	type="button"
	class="rounded-md bg-black/30 p-1 hover:bg-black/50"
	use:tooltip={{
		title: copied ? 'Copied' : 'Copy to clipboard'
	}}
	on:click={() => {
		if (timeout) return;

		navigator.clipboard.writeText(value);
		copied = true;

		timeout = setTimeout(() => {
			copied = false;
			timeout = null;
		}, 2000);
	}}
>
	<IconButton
		role="img"
		icon={copied ? 'check' : 'copy'}
		class="text-2xl {copied ? 'text-neutral-content-disabled' : ''}"
	/>
</button>
