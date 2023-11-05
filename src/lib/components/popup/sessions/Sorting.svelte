<script lang="ts">
  import { settings } from '@/lib/stores';
  import type { SortMethod } from '@/lib/types';

  function changeSortMethod(val: string) {
    settings.changeSetting('sortMethod', val as SortMethod);
  }
</script>

<select
  name="sort-method"
  id="sort-method"
  class="rounded-md p-0.5 text-xs"
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
