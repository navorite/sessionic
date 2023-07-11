<script lang="ts">
  import { tick } from 'svelte';
  import IconButton from './IconButton.svelte';

  export let value: string;

  let className = '';

  export { className as class };

  let showInputBar = false;

  let inputEl: HTMLInputElement;

  async function handleInputBar(event: FocusEvent) {
    if (event?.type === 'focusin') {
      showInputBar = true;
      await tick();
      inputEl?.focus();
    } else if (
      event?.type == 'focusout' &&
      !(event?.currentTarget as Node).contains(event?.relatedTarget as Node) &&
      value === ''
    )
      showInputBar = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="flex justify-center items-center font-semibold rounded-md cursor-text {showInputBar
    ? 'bg-neutral-5 px-2 py-0.5'
    : ''} fade {className}"
  on:focusin={handleInputBar}
  on:focusout={handleInputBar}
  tabindex="0"
>
  {#if showInputBar}
    <input
      bind:this={inputEl}
      on:keydown={(event) => {
        if (event.key === 'Escape') showInputBar = false;
      }}
      spellcheck={false}
      type="text"
      title="Search for Session or Tab name..."
      placeholder="Search Session..."
      bind:value
      class="font-semibold bg-transparent outline-none"
    />
    <IconButton
      icon="close"
      title="Clear input"
      class="text-2xl hover:text-red-700"
      on:click={() => {
        if (value === '') showInputBar = false;
        value = '';
      }}
    />
  {:else}
    <IconButton icon="search" title="Search for session or tab..." />
  {/if}
</div>

<!-- // function expandWidth(node: HTMLElement, duration: number) {
  //   if (!node?.offsetWidth) return;
  //   const width = node.offsetWidth;

  //   const speed = width / duration;

  //   // return {duration, tick: (t) => {node.style.width = }}
  // } -->
