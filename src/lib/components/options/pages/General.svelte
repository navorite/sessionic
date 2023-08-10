<script lang="ts">
	import type { ESession } from '@/lib/types';
	import { settings } from '@/lib/stores';
	import { sessionsDB } from '@/lib/utils';
	import { Switch, Section } from '@/lib/components';
	import { compressToUint8Array, decompressFromUint8Array } from 'lz-string';

	$: urlList =
		$settings.urlFilterList[0] === '<all_urls>'
			? ''
			: $settings.urlFilterList.join('\n');

	async function handleExport() {
		const date = new Date();

		const sessions = await sessionsDB.loadSessions();

		const fileName = `[${__EXT_NAME__}]${
			sessions.length ?? 0
		}_session-${date.toLocaleDateString([], {
			dateStyle: 'short'
		})}-${date.toLocaleTimeString([], {
			timeStyle: 'short'
		})}.json`;

		const compressed = compressToUint8Array(JSON.stringify(sessions));

		const blob = new Blob([compressed]);

		const url = URL.createObjectURL(blob);

		const anchor = document.createElement('a') as HTMLAnchorElement;

		anchor.style.display = 'none';

		anchor.href = url;
		anchor.download = fileName;

		document.body.appendChild(anchor);

		anchor.click();

		URL.revokeObjectURL(url);

		anchor.remove();
	}

	async function handleImport(event: Event) {
		const file = (event.target as HTMLInputElement).files![0]!;

		const fileReader = new FileReader();

		fileReader.readAsArrayBuffer(file);

		fileReader.onloadend = async (ev) => {
			const bytes = new Uint8Array(ev.target?.result as ArrayBufferLike);

			const sessions = JSON.parse(
				decompressFromUint8Array(bytes)
			) as ESession[];

			if (!sessions.length) return;

			sessionsDB.saveSessions(sessions);
		};
	}

	function handleFilterListChange(
		ev: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
	) {
		const value = ev.currentTarget.value;

		const urls = value.match(
			/(\b(https?|ftp|file)|\B\*):\/{2}(\*|(\*\.)?[^*/\s:]*)\/[^\s]*/g
		) ?? ['<all_urls>'];

		settings.changeSetting('urlFilterList', urls);

		ev.currentTarget.value = urlList;
	}
</script>

<Section title="User Interface">
	<Switch
		title="Popup View"
		checked={$settings.popupView}
		on:change={() => {
			settings.changeSetting('popupView', !$settings.popupView);
		}}
	/>

	<Switch
		title="Dark Mode"
		checked={$settings.darkMode}
		on:change={() => settings.changeSetting('darkMode', !$settings.darkMode)}
	/>
</Section>

<Section title="Extension Actions">
	<label class="flex flex-col gap-2 font-medium">
		URL Filter List
		<textarea
			name="filter-list"
			id="filter-list"
			rows="8"
			placeholder={'e.g. track only the following URL match patterns:\n*://*/*\nfile:///*/*\nftp://*/*\nchrome://*/*\nhttps://*.google.com/\nhttps://www.youtube.com/*\n'}
			class="resize-none rounded-md bg-neutral-3 p-2 text-sm placeholder:text-neutral-content/40"
			inputmode="url"
			value={urlList}
			on:change={handleFilterListChange}
		/>
	</label>

	<Switch
		title="Lazy load tabs"
		description="Greatly reduce memory usage by not loading tab until selected"
		checked={$settings.discarded}
		on:change={() => settings.changeSetting('discarded', !$settings.discarded)}
	/>

	<button
		type="button"
		class="max-w-fit rounded-md bg-error px-4 py-2 text-white hover:bg-error-focus"
		on:click={settings.clear}
	>
		Reset All Settings
	</button>
</Section>

<Section title="Session Actions">
	<div class="flex gap-2">
		<label
			class="max-w-max cursor-pointer rounded-md bg-neutral-4 p-2 hover:bg-neutral-5"
		>
			Import Sessions
			<input
				type="file"
				class="hidden"
				on:change={handleImport}
				accept=".json"
			/>
		</label>

		<button
			class="max-w-max rounded-md bg-neutral-4 p-2 hover:bg-neutral-5"
			on:click={handleExport}>Export Sessions</button
		>
	</div>
</Section>
