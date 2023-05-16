import type { Config } from 'tailwindcss';
import { generateScale } from './scripts/config';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'neutral-pure': generateScale('gray', 9, 10),
        'primary-pure': generateScale('indigo', 9, 10),
        'secondary-pure': generateScale('blue', 9, 10),
        'warning-pure': generateScale('red', 9, 10),
      },

      textColor: {
        neutral: generateScale('gray', 11, 12),
      },

      backgroundColor: {
        neutral: generateScale('gray', 1, 5),
        primary: generateScale('indigo', 1, 5),
        secondary: generateScale('blue', 1, 5),
      },

      borderColor: {
        neutral: generateScale('gray', 6, 8),
        primary: generateScale('indigo', 6, 8),
        secondary: generateScale('blue', 6, 8),
      },
    },
  },

  plugins: [
    require('radix-colors-for-tailwind')({
      colors: ['gray', 'blue', 'red', 'indigo'],
    }),
  ],
} satisfies Config;
