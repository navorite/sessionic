<script lang="ts">
  export let id: string;
  export let checked = false;
</script>

<label class="flex max-w-max gap-2 items-center p-2 rounded-md">
  <input type="checkbox" {id} name={id} bind:checked on:change />
  <span
    title={checked ? 'On' : 'Off'}
    class="inline-block relative border-2 border-solid border-neutral-content-disabled w-11 h-5 rounded-md fade before:fade before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:block before:w-5 before:h-4 before:rounded-md before:bg-error"
  />
  <slot />
</label>

<style>
  label:hover {
    background-color: var(--neutral-3);
    cursor: pointer;
  }

  span,
  span::before,
  span::after {
    box-sizing: content-box;
  }

  input {
    display: none; /*not the best for accessibility*/
  }

  label:hover span {
    border-color: var(--neutral-content);
  }

  label:hover span:before {
    background-color: var(--error-focus);
  }

  input:checked + span:before {
    translate: 100% 0%;
    background-color: var(--success);
  }

  input:checked:hover + span:before {
    translate: 100% 0%;
    background-color: var(--success-focus);
  }
</style>
