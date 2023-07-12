import { generateScale } from './scripts/config';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        neutral: generateScale('neutral', 1, 6),
        'neutral-focus': 'var(--neutral-focus)',
        primary: 'var(--primary)',
        'primary-focus': 'var(--primary-focus)',
        success: 'var(--success)',
        'success-focus': 'var(--success-focus)',
        warning: 'var(--warning)',
        'warning-focus': 'var(--warning-focus)',
        error: 'var(--error)',
        'error-focus': 'var(--error-focus)',
        'overlay-black': 'var(--overlay-black)',
        'overlay-white': 'var(--overlay-white)',

        /*Text*/
        'neutral-content': 'var(--neutral-content)',
        'neutral-content-disabled': 'var(--neutral-content-muted)',

        tooltip: 'var(--tooltip)',
        'tooltip-content': 'var(--tooltip-content)',
      },
    },
  },
  plugins: [],
};
