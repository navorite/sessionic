<script lang="ts">
  import type { SortMethod } from '@/lib/types';
  import { settings } from '@/lib/stores';

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
  <optgroup label="Date">
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
  </optgroup>
  <optgroup label="Name">
    <option value="az">A-Z</option>
    <option value="za">Z-A</option>
  </optgroup>
</select>
