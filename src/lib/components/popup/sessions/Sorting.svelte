<script lang="ts">
  import { sessions, settings } from '@/lib/stores';
  import type { SortMethod } from '@/lib/types';

  function changeSortMethod(val: string) {
    settings.changeSetting('sortMethod', val as SortMethod);
    sessions.sort();
  }
</script>

<select
  name="sort-method"
  id="sort-method"
  class="rounded-md bg-neutral-3 px-2 py-1 text-xs"
  value={$settings.sortMethod}
  on:change={(ev) => changeSortMethod(ev.currentTarget.value)}
>
  <optgroup label="Date">
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
  </optgroup>
  <optgroup label="Name">
    <option value="az">A-Z</option>
    <option value="za">Z-A</option>
  </optgroup>
</select>
