<script lang="ts">
	import { settings } from '@/lib/stores';
	import { Switch, Section, TagEditor } from '@/lib/components';
	import {
		handleExport,
		handleFilterListChange,
		handleImport,
		sendMessage
	} from '@/lib/utils';
	import browser from 'webextension-polyfill';

	$: urlList = $settings.urlFilterList?.join('\n') ?? '';
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

<Section title="Automatic saving">
	<Switch
		title="Automatically save sessions"
		description="Greatly reduce memory usage by not loading tab until selected"
		checked={$settings.autoSave}
		on:change={() => {
			settings.changeSetting('autoSave', !$settings.autoSave);

			if ($settings.autoSave) sendMessage({ message: 'createTimer' });
			else browser.alarms.clear('auto-save');
		}}
	/>
	<label class="max-w-max text-sm font-medium">
		<input
			type="number"
			class="mr-2 h-7 w-11 rounded-md text-center disabled:text-neutral-6"
			min="1"
			max="15"
			value={$settings.autoSaveMaxSessions}
			on:change={(event) => {
				if (Number(event.currentTarget.value) > 15)
					event.currentTarget.value = '15';
				if (Number(event.currentTarget.value) < 1)
					event.currentTarget.value = '1';

				settings.changeSetting(
					'autoSaveMaxSessions',
					Number(event.currentTarget.value)
				);
			}}
			disabled={!$settings.autoSave}
		/>
		Max number of saved sessions (max. 15 sessions)
	</label>
	<label class="max-w-max text-sm font-medium">
		<input
			type="number"
			class="mr-2 h-7 w-11 rounded-md text-center disabled:text-neutral-6"
			min="1"
			value={$settings.autoSaveTimer}
			on:change={(event) => {
				if (Number(event.currentTarget.value) < 1)
					event.currentTarget.value = '1';

				settings.changeSetting(
					'autoSaveTimer',
					Number(event.currentTarget.value)
				);

				sendMessage({ message: 'createTimer' });
			}}
			disabled={!$settings.autoSave}
		/>
		Save interval in minutes (min. 1 minute)
	</label>
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
			on:change={(ev) => handleFilterListChange(ev, urlList)}
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
	<TagEditor />

	<div class="flex gap-2">
		<label
			class="max-w-max cursor-pointer rounded-md bg-neutral-4 p-2 hover:bg-neutral-5"
		>
			Import Sessions
			<input
				type="file"
				class="hidden"
				on:change={handleImport}
				accept=".json, .ssf"
			/>
		</label>

		<button
			class="max-w-max rounded-md bg-neutral-4 p-2 hover:bg-neutral-5"
			on:click={handleExport}>Export Sessions</button
		>
	</div>
</Section>
