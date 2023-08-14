<script>
	import { Donate, Section } from '@/lib/components';
</script>

<Section title="About">
	<div class="flex flex-col items-baseline gap-2 text-sm font-medium">
		<p class="text-sm">
			{__EXT_NAME__}
			{__EXT_VER__}
		</p>
		<a href="https://github.com/navorite/sessionic/releases" target="_blank"
			>Changelog</a
		>
		<a href="https://github.com/navorite/sessionic" target="_blank"
			>Source code (AGPL v3)</a
		>
	</div>

	<h2 class="text-lg font-bold">Consider Donating</h2>

	<Donate />
</Section>

<style lang="postcss">
	a {
		@apply font-medium text-link hover:text-link-focus;
	}
</style>
