<script lang="ts">
  import { tooltip } from '@/lib/utils';

  export let bgColor: string = 'royalblue';
  export let textColor: string = 'white';
  export let name: string;

  let className = '';
  export { className as class };
</script>

<div
  style:background-color={bgColor}
  style:color={textColor}
  class="flex min-h-full max-w-[7rem] flex-1 cursor-default items-center justify-center rounded-md bg-primary {className}"
  use:tooltip={{ title: name }}
>
  <span
    class="overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0.5 text-center text-xs font-semibold text-white"
    >{name}</span
  >
</div>
