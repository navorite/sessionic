<script lang="ts">
  import type { SortMethod } from '@/lib/types';
  import { settings } from '@/lib/stores';
  import { i18n } from 'webextension-polyfill';

  function changeSortMethod(val: string) {
    settings.changeSetting('sortMethod', val as SortMethod);
  }
</script>

<select
  name="sort-method"
  id="sort-method"
  class="min-w-[5rem] rounded-md bg-neutral-3 p-1 text-center text-xs"
  value={$settings.sortMethod}
  on:change={(ev) => changeSortMethod(ev.currentTarget.value)}
>
  <optgroup label={i18n.getMessage('labelSortDate')}>
    <option value="newest">{i18n.getMessage('labelSortNewest')}</option>
    <option value="oldest">{i18n.getMessage('labelSortOldest')}</option>
  </optgroup>
  <optgroup label={i18n.getMessage('labelSortName')}>
    <option value="az">{i18n.getMessage('labelSortAZ')}</option>
    <option value="za">{i18n.getMessage('labelSortZA')}</option>
  </optgroup>
</select>
