<script lang="ts">
  import { tooltip } from '@utils/tooltip';

  export let title: string;
  export let checked = false;
  export let description = '';
</script>

<label
  class="flex max-w-max gap-2 items-center p-2 rounded-md font-medium"
  use:tooltip={{ title: description }}
>
  <input type="checkbox" aria-hidden="true" bind:checked on:change />
  <span
    tabindex="0"
    role="switch"
    aria-checked={checked}
    aria-label={title}
    class="block relative bg-neutral-6 w-[3.25rem] h-7 rounded-full before:fade before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:block before:w-6 before:h-6 before:rounded-full before:bg-error"
  />
  {title}
</label>

<style>
  label:hover {
    background-color: hsl(var(--neutral-3));
    cursor: pointer;
  }

  input {
    display: none; /*not the best for accessibility*/
  }

  label:hover span {
    border-color: hsl(var(--neutral-content));
  }

  label:hover span:before {
    background-color: hsl(var(--error-focus));
  }

  input:checked + span:before {
    translate: 100% 0%;
    background-color: hsl(var(--success));
  }

  input:checked:hover + span:before {
    translate: 100% 0%;
    background-color: hsl(var(--success-focus));
  }
</style>
