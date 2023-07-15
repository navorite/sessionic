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
        'neutral-content': 'hsl(var(--neutral-content) / <alpha-value>)',

        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-focus': 'hsl(var(--primary-focus) / <alpha-value>)',

        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-focus': 'hsl(var(--accent-focus) / <alpha-value>)',

        info: 'hsl(var(--info) / <alpha-value>)',
        'info-focus': 'hsl(var(--info-focus) / <alpha-value>)',

        success: 'hsl(var(--success) / <alpha-value>)',
        'success-focus': 'hsl(var(--success-focus) / <alpha-value>)',

        warning: 'hsl(var(--warning) / <alpha-value>)',
        'warning-focus': 'hsl(var(--warning-focus) / <alpha-value>)',

        error: 'hsl(var(--error) / <alpha-value>)',
        'error-focus': 'hsl(var(--error-focus) / <alpha-value>)',

        tooltip: 'hsl(var(--tooltip) / <alpha-value>)',
        'tooltip-content': 'hsl(var(--tooltip-content) / <alpha-value>)',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
