<script lang="ts">
  import { tick } from 'svelte';
  import IconButton from './IconButton.svelte';
  import { sessionList } from '@stores/session';
  import log from '@utils/log';

  export let value = '';

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
      !(event?.currentTarget as Node).contains(event?.relatedTarget as Node)
    ) {
      showInputBar = false;
      value = '';
    }
  }

  /*TODO: Handle search correctly*/
  function handleSearchAction() {
    if (!showInputBar || inputEl.value === '') return;
    log.info('Searching...');
    $sessionList = $sessionList.filter((session) =>
      session.title.includes(inputEl.value)
    );
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
  class="flex justify-center items-center font-semibold rounded-md cursor-text focus-within:bg-neutral-5 focus-within:px-2 focus-within:py-0.5 motion-safe:fade {className}"
  on:focusin={handleInputBar}
  on:focusout={handleInputBar}
  tabindex="0"
>
  {#if showInputBar}
    <input
      bind:this={inputEl}
      type="text"
      title="Search for Session or Tab name..."
      placeholder="Session or Tab name..."
      bind:value
      class="font-semibold bg-transparent outline-none"
    />
    <IconButton
      icon="clear"
      title="Clear input"
      class="text-2xl hover:text-warning-pure-1"
      on:click={() => {
        showInputBar = false;
        value = '';
      }}
    />
  {/if}

  <IconButton
    icon="search"
    title="Search for Session or Tab name.."
    on:click={handleSearchAction}
    class="text-2xl hover:text-primary-pure-1"
  />
</div>
