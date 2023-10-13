<script>
  import { Section, Shortcut } from '@/lib/components';
</script>

<Section title="Keyboard Shortcuts">
  <Shortcut keybind={['CTRL', 'K']} action="Open Command Palette" />
  <Shortcut keybind={['S']} action="Save current session" />
  <Shortcut keybind={['R']} action="Rename selected session" />
  <Shortcut keybind={['F']} action="Focus search box" />
  <Shortcut keybind={['C']} action="Display current session" />
  <Shortcut keybind={['E']} action="Select previous session" />
  <Shortcut keybind={['D']} action="Select next session" />
  <Shortcut keybind={['Delete']} action="Delete selected session" />
</Section>
