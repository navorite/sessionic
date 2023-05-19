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
        'neutral-pure': generateScale('gray', 9, 10),
        'primary-pure': generateScale('indigo', 9, 10),
        'secondary-pure': generateScale('blue', 9, 10),
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
