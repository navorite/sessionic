<script lang="ts">
  export let id: string;
  export let checked = false;
</script>

<label class="flex max-w-max gap-2 items-center p-2 rounded-md">
  <input type="checkbox" {id} name={id} bind:checked on:change />
  <span
    title={checked ? 'On' : 'Off'}
    class="inline-block relative bg-neutral-6 w-11 h-6 rounded-full fade before:fade before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:block before:w-5 before:h-5 before:rounded-full before:bg-error"
  />
  <slot />
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
