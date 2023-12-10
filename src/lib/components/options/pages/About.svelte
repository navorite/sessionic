<script>
  import { Donate, Section } from '@/lib/components';
  import { EXT_NAME, EXT_VER } from '@/lib/constants';
  import { i18n } from 'webextension-polyfill';
</script>

<Section title={i18n.getMessage('aboutPage')}>
  <div class="flex flex-col items-baseline gap-2 text-sm font-medium">
    <p class="text-sm">
      {EXT_NAME}
      {EXT_VER}
    </p>
    <a href="https://github.com/navorite/sessionic/releases" target="_blank"
      >{i18n.getMessage('aboutChangelogLabel')}</a
    >
    <a href="https://github.com/navorite/sessionic" target="_blank"
      >{i18n.getMessage('aboutSourceCodeLabel')}</a
    >
    <a href="https://hosted.weblate.org/projects/sessionic" target="_blank"
      >{i18n.getMessage('aboutTranslationsLabel')}</a
    >
    <a
      href="https://github.com/navorite/sessionic/blob/main/LICENSE"
      target="_blank">{i18n.getMessage('aboutLicenseLabel')}</a
    >
  </div>

  <h2 class="text-lg font-bold">{i18n.getMessage('aboutDonateHeading')}</h2>

  <Donate />
</Section>

<style lang="postcss">
  a {
    @apply font-medium text-link hover:text-link-focus;
  }
</style>
