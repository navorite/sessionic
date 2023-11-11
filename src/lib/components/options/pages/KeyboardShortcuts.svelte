<script>
  import { Section, Shortcut } from '@/lib/components';
  import { i18n } from 'webextension-polyfill';
</script>

<Section title={i18n.getMessage('keyboardShortcutsHeading')}>
  <Shortcut
    keybind={['CTRL', 'K']}
    action={i18n.getMessage('shortcutCommandPalette')}
  />
  <Shortcut keybind={['S']} action={i18n.getMessage('shortcutSaveCurrent')} />
  <Shortcut
    keybind={['R']}
    action={i18n.getMessage('shortcutRenameSelected')}
  />
  <Shortcut keybind={['F']} action={i18n.getMessage('shortcutFocusSearch')} />
  <Shortcut
    keybind={['C']}
    action={i18n.getMessage('shortcutDisplayCurrent')}
  />
  <Shortcut
    keybind={['E']}
    action={i18n.getMessage('shortcutSelectPrevious')}
  />
  <Shortcut keybind={['D']} action={i18n.getMessage('shortcutSelectNext')} />
  <Shortcut
    keybind={['Delete']}
    action={i18n.getMessage('shortcutDeleteSelected')}
  />
</Section>
