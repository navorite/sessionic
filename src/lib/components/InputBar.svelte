<script lang="ts">
  import { tick } from 'svelte';
  import type { Icon } from '../types/extension';
  import IconButton from './IconButton.svelte';

  export let icon: Icon = 'default';
  export let title = '';
  export let placeholder = title;
  export let value = '';

  let showInputBar = false;

  let inputEl: HTMLInputElement;

  async function handleInputBar(event: FocusEvent) {
    if (event?.type === 'focusin') {
      showInputBar = true;
      await tick();
      inputEl?.focus();
    } else if (
      event?.type == 'focusout' &&
      !(event?.currentTarget as Node).contains(event?.relatedTarget as Node)
    ) {
      showInputBar = false;
      value = '';
    }
  }

  // function expandWidth(node: HTMLElement, duration: number) {
  //   if (!node?.offsetWidth) return;
  //   const width = node.offsetWidth;

  //   const speed = width / duration;

  //   // return {duration, tick: (t) => {node.style.width = }}
  // }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="flex justify-center items-center font-semibold rounded-md cursor-text focus-within:bg-active focus-within:px-2 focus-within:py-0.5 motion-safe:fade"
  on:focusin={handleInputBar}
  on:focusout={handleInputBar}
  tabindex="0"
>
  {#if showInputBar}
    <input
      bind:this={inputEl}
      type="text"
      {placeholder}
      bind:value
      {title}
      class="font-semibold bg-transparent outline-none"
    />
    <IconButton
      icon="clear"
      title="Clear input"
      class="text-2xl hover:text-icon-warning"
      on:click={() => {
        showInputBar = false;
        value = '';
      }}
    />
  {/if}

  <IconButton {icon} {title} on:click class="text-2xl hover:text-icon" />
</div>
