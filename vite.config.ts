import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
// import { analyzer } from 'vite-bundle-analyzer'
import vitePluginDemo from './build/vite-plugin-demo'
import { ProNaiveUIResolver } from './packages/resolver/src/index'

export default defineConfig(({ mode }) => {
  const nodeEnv = loadEnv(mode, './').VITE_USER_NODE_ENV
  return {
    optimizeDeps: {
      include: [
        'mockjs',
      ],
    },
    define: {
      '__DEV__': nodeEnv !== 'production',
      'process.env.NODE_ENV': nodeEnv !== 'production',
    },
    base:'/pro-naive-ui/',
    plugins: [
      UnoCSS(),
      ...vitePluginDemo(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
      }),
      Components({
        resolvers: [
          NaiveUiResolver(),
          ProNaiveUIResolver(),
        ],
      }),
      // analyzer(),
    ],
    resolve: {
      alias: [
        {
          find: 'pro-naive-ui',
          replacement: resolve(__dirname, './packages/components/src/index.ts'),
        },
        {
          find: '/demo',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue': ['vue'],
            'naive-ui': ['naive-ui'],
            'lodash-es': ['lodash-es'],
            'vue-router': ['vue-router'],
            'vicons': ['@vicons/ionicons5'],
            'highlight.js': ['highlight.js'],
          },
        },
      },
    },
  }
})
