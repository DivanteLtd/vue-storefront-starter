const path = require('path')
const themePath = require('./scripts/theme-path')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

const createApiFile = TARGET_NODE
  ? './create-api-server.js'
  : './create-api-client.js'

module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cacheId: 'vue-sfr',
      globPatterns: ['dist/**.*', 'index.html', '/'],
      globIgnores: [/\.map$/],
      runtimeCaching: [
        {
          urlPattern: '^https://fonts.googleapis.com/',
          handler: 'cacheFirst'
        },
        {
          urlPattern: '^https://fonts.gstatic.com/',
          handler: 'cacheFirst'
        },
        {
          urlPattern: '/',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/p/*', // Product URLs
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/c/*', // Category URLs
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/img/(.*)',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/api/catalog/*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/api/*',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/assets/logo.svg',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/index.html',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/assets/*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/assets/ig/(.*)',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/dist/(.*)',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: '/*/*', // Product URLs
          handler: 'networkFirst'
        },
        {
          urlPattern: '/*/*/*', // Product URLs
          handler: 'networkFirst'
        },
        {
          urlPattern: '/*', // Category URLs
          handler: 'networkFirst'
        }
      ],
      importScripts: ['/dist/core-service-worker.js']
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        config: path.resolve(__dirname, './config/local.json'),
        core: '@vue-storefront/core',
        src: path.resolve(__dirname, './src'),
        '@vue-storefront/core/lib/i18n': '@vue-storefront/i18n',
        theme: themePath,
        'create-api': createApiFile
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('markdown-to-vue')
      .loader('markdown-to-vue-loader')
      .options({
        componentWrapper: 'div'
      })
      .end()
  },
  pluginOptions: {
    ssr: {
      entry: target => `@vue-storefront/core/${target}-entry`,
      nodeExternalsWhitelist: [
        /\.css$/,
        /\?vue&type=style/,
        /^@vue-storefront/,
        /^lodash-es/,
        /^vue-offline/,
        /^vsf-payment-stripe/
      ]
    }
  }
}
