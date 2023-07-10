<script lang="ts">
  export let id: string;
  export let checked = false;
</script>

<label class="flex max-w-max gap-2 items-center p-1 rounded-md">
  <input type="checkbox" {id} name={id} bind:checked on:change />
  <span
    title={checked ? 'On' : 'Off'}
    class="inline-block relative w-9 h-5 rounded-md before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:block border-2 border-solid border-neutral-content before:w-4 before:h-4 before:rounded-md before:bg-neutral-content"
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

  span,
  span:before {
    transition: all 200ms ease-in-out;
  }

  input:checked + span {
    border-color: var(--primary-focus);
  }

  input:checked + span:before {
    translate: 100% 0%;
    background-color: var(--primary-focus);
  }

  label:hover span:before {
    background-color: var(--accent);
  }
</style>
