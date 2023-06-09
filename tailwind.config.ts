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
        //'overlay-primary': generateScale('indigoA', 1, 12),
        //'overlay-neutral': generateScale('grayA', 1, 12),
        'overlay-black': generateScale('blackA', 1, 12),
        'overlay-white': generateScale('whiteA', 1, 12),
        neutral: generateScale('gray', 1, 12),
        primary: generateScale('indigo', 1, 12),
        secondary: generateScale('blue', 1, 12),
      },
    },
  },

  plugins: [
    require('radix-colors-for-tailwind')({
      colors: [
        'gray',
        'blue',
        'indigo',
        //'indigoA',
        //'grayA',
        'blackA',
        'whiteA',
      ],
    }),
  ],
} satisfies Config;
