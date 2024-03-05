import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solid(),
    tsconfigPaths({ root: './' }),
  ],
})
