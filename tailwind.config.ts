import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    colors: {
      primary: 'var(--gray1)',
      'primary-subtle': 'var(--gray2)',
      secondary: 'var(--gray3)',
      solid: 'var(--gray9)',
      hover: 'var(--gray4)',
      active: 'var(--gray5)',
      transparent: 'transparent',
      current: 'currentColor',
    },

    textColor: {
      primary: 'var(--gray12)',
      secondary: 'var(--gray11)',
      icon: 'var(--blue9)',
      'icon-warning': 'var(--red9)',
    },

    borderColor: {
      primary: 'var(--gray6)',
      focus: 'var(--gray7)',
      hover: 'var(--gray8)',
    },

    extend: {
      colors: {
        solid: 'var(--gray9)',
      },
    },
  },
  plugins: [
    require('radix-colors-for-tailwind')({
      colors: [
        'gray',
        'blue',
        'sky',
        'red',
        'green',
        'grass',
        'orange',
        'indigo',
      ],
    }),
  ],
} satisfies Config;
