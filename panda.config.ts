import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'indigo',
      grayColor: 'mauve',
      borderRadius: 'md',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'solid',
  outdir: 'styled-system',

  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
  },

  theme: {
    keyframes: {
      appear: {
        '0%': { opacity: '0.7', transform: 'translateY(-20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
})
