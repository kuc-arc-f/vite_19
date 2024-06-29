import { createRequire } from 'module'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        preact({
          babel: {
            cwd: createRequire(import.meta.url).resolve('@preact/preset-vite')
          }
        })
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
      build: {
        lib: {
          entry: [
            './src/entry-client.tsx',
          ],
          formats: ['es'],
          fileName: '[name]',
        },
        rollupOptions: {
          output: {
            dir: './public/static'
          }
        },
        emptyOutDir: false,
        copyPublicDir: false
      }
    }
  }else{
    return {
      plugins: [
        preact({
          babel: {
            // Change cwd to load Preact Babel plugins
            cwd: createRequire(import.meta.url).resolve('@preact/preset-vite')
          }
        })
      ]
    }
  }
})