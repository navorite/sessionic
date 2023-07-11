<script lang="ts">
  import { tooltip } from '@utils/tooltip';

  export let title = 'Session Details';

  export { className as class };

  let className = 'text-xs';
</script>

<div
  role="status"
  use:tooltip={{ title }}
  class="inline-flex items-center w-max font-bold gap-1 rounded py-1 px-1.5 mr-1 {className}"
>
  <slot />
</div>
