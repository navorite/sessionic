<script lang="ts">
  import { tooltip } from '@utils/tooltip';

  export let title: string;
  export let checked = false;
  export let description = '';
</script>

<label
  class="flex max-w-max gap-2 items-center rounded-md font-medium text-sm cursor-pointer hover:brightness-125"
  use:tooltip={{ title: description }}
>
  <input type="checkbox" aria-hidden="true" bind:checked on:change />
  <span
    tabindex="0"
    role="switch"
    aria-checked={checked}
    aria-label={title}
    class="block relative bg-neutral-6 w-11 h-6 rounded-full before:fade before:content-[''] before:bg-white before:absolute before:block before:w-6 before:h-6 before:rounded-full before:-left-0.5"
  />
  {title}
</label>

<style>
  input {
    display: none; /*not the best for accessibility*/
  }

  input:checked + span {
    background-color: hsl(var(--primary));
  }

  input:checked + span:before {
    translate: 100% 0%;
  }

  label:hover > span::before {
    background-color: white;
  }
</style>
