import { generateScale } from './scripts/utils';
import {defineConfig, presetUno, transformerDirectives, transformerVariantGroup} from 'unocss';

export default defineConfig({
  content: {filesystem: ['./src/**/*.{html,js,ts,svelte}']},
  theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        neutral: generateScale('neutral', 1, 6),
        'neutral-content': 'hsl(var(--neutral-content) / <alpha-value>)',

        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-focus': 'hsl(var(--primary-focus) / <alpha-value>)',

        link: 'hsl(var(--link) / <alpha-value>)',
        'link-focus': 'hsl(var(--link-focus) / <alpha-value>)',

        info: 'hsl(var(--info) / <alpha-value>)',
        'info-focus': 'hsl(var(--info-focus) / <alpha-value>)',

        success: 'hsl(var(--success) / <alpha-value>)',
        'success-focus': 'hsl(var(--success-focus) / <alpha-value>)',

        warning: 'hsl(var(--warning) / <alpha-value>)',
        'warning-focus': 'hsl(var(--warning-focus) / <alpha-value>)',

        error: 'hsl(var(--error) / <alpha-value>)',
        'error-focus': 'hsl(var(--error-focus) / <alpha-value>)',

        tooltip: 'hsl(var(--tooltip) / <alpha-value>)',
        'tooltip-content': 'hsl(var(--tooltip-content) / <alpha-value>)'
      },

      fontFamily: {
        sans: 
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        
      }
    },
  presets: [presetUno({})],
  transformers: [transformerDirectives(), transformerVariantGroup()]
  
})