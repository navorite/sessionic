<script lang="ts">
  import Modal from '@components/basic/Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { tick } from 'svelte';

  export let type: 'Save' | 'Rename';

  export let value = '';

  export let minlength = 3;
  export let maxlength = 40;

  let disabled = true;
  let errMsg = '';

  export let open = false;

  $: if (value?.length < minlength || value?.length > maxlength) {
    disabled = true;
    errMsg = `Session name must be between ${minlength} and ${maxlength} characters.`;
  } else if (/[<>]/.test(value)) {
    disabled = true;
    errMsg = "Session name must not contain '<' or '>' characters.";
  } else disabled = false;

  let inputEl: HTMLInputElement;

  $: if (open)
    tick().then(() => {
      inputEl?.focus();
    });

  const dispatch = createEventDispatcher<{ inputSubmit: string }>();

  function submit() {
    dispatch('inputSubmit', value);
    value = '';
  }
</script>

<Modal bind:open height="12rem">
  <svelte:fragment slot="header">{type} session</svelte:fragment>
  <svelte:fragment slot="content">
    <input
      bind:this={inputEl}
      class="font-semibold bg-transparent outline-none border-2 border-solid border-neutral-8 rounded-md py-1 px-2 w-[24rem] placeholder:text-neutral-12"
      type="text"
      name={type}
      id={type}
      placeholder="Enter session name..."
      title="Session name"
      spellcheck={false}
      {minlength}
      {maxlength}
      bind:value
      on:keydown={(event) => {
        event.key === 'Enter' && submit();
      }}
    />

    {#if disabled}
      <p
        class="font-semibold rounded-md p-1 px-2 text-sm w-max mx-auto bg-error text-white"
      >
        {errMsg}
      </p>
    {/if}
  </svelte:fragment>

  <button
    {disabled}
    title="{type} session"
    slot="footer"
    type="button"
    class="{type === 'Rename'
      ? 'px-4'
      : 'px-6'} py-1 text-center bg-primary-8 rounded-md hover:bg-primary-9 disabled:bg-neutral-5 disabled:text-neutral-10 disabled:cursor-not-allowed"
    on:click={submit}>{type}</button
  >
</Modal>
