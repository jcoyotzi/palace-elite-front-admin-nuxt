import {resolve} from 'path'
import i18n from './src/ui/i18n/i18n'

require('dotenv').config()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,
  env: {
    apiUrl: process.env.ENDPOINT_PRELOGIN,
    strapiUrl: process.env.STRAPI_URL,
    strapiToken: process.env.STRAPI_TOKEN,
    baseURL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    awsAmplifyConfig: {
      identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
      region: process.env.COGNITO_REGION,
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.COGNITO_USER_POOL_CLIENT_WEB_ID,
      baseURL: process.env.COGNITO_BASE_URL,
    },
  },
  privateRuntimeConfig: {},

  generate: {
    // fallback: true,
    crawler: false,
    devtools: true,
    exclude: [/^\/es/],
    routes: ['/'/* , '/test' */]
    /*
    minify: {
      collapseWhitespace: false
    }
    */
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Palace Elite',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'ogSiteName', content: 'Palace Elite'},
      {name: 'ogTitle', content: 'Palace Elite'},
      {name: 'ogDescription', content: ''},
      {name: 'ogType', content: 'website'},
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.NUXT_BASE_URL}/android-chrome-512x512.png`
      },
      {
        hid: 'og:image:url',
        property: 'og:image:url',
        content: `${process.env.NUXT_BASE_URL}/android-chrome-512x512.png`
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${process.env.NUXT_BASE_URL}/android-chrome-512x512.png`
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${process.env.NUXT_BASE_URL}/favicon.ico`
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css', 'node_modules/@pr-elite-components-library/lib/dist/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-class-components', mode: 'client'},
    {src: '~/plugins/amplify', mode: 'client'},
    {src: '~/plugins/prcomponents', mode: 'client'},
    {src: '~/plugins/authSSO', mode: 'client'},
    {src: '~/plugins/authRouteBeforeEnter', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', {disableVuex: false}]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    '@nuxtjs/gtm'
  ],
  i18n,

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/android-chrome-512x512.png',
      fileName: 'icon.png',
      sizes: [64, 83, 90, 120, 144, 152, 192, 384, 512],
      targetDir: 'icons',
      plugin: true,
      pluginName: '$icon',
      purpose: 'any',
      cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
    },
    manifest: {
      name: 'Palace Elite',
      short_name: 'Palace Elite',
      description: '',
      lang: 'en',
      useWebmanifestExtension: false,
      icons: [
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [512],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        },
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [384],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        },
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [192],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        },
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [152],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        },
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [144],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        },
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [120],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        },
        {
          source: './static/android-chrome-512x512.png',
          fileName: 'icon.png',
          sizes: [64, 83, 90],
          targetDir: 'icons',
          plugin: true,
          pluginName: '$icon',
          purpose: 'any',
          cacheDir: '{rootDir}/node_modules/.cache/pwa/icon'
        }
      ]
    }
  },

  tailwindcss: {
    // add '~tailwind.config` alias
    exposeConfig: true,
    injectPosition: 'last'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },

    // transpile: ['@pr-elite-components-library/lib'],
    transpile: ['vee-validate/dist/rules', /^vue2-google-maps($|\/)/],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    splitChunks: {
      layouts: true,
      pages: false,
      commons: false
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
      }
    }
  },

  srcDir: 'src/ui',
  alias: {
    '~': resolve(__dirname, '.'),
    app: resolve(__dirname, './src/app')
  },
  render: {
    bundleRenderer: {
      runInNewContext: false
    }
  },

  router: {
    extendRoutes(routes) {
      routes.forEach(route => {
        // When options.generate.subFolders is true (default)
        const alias = route.path.length > 1 ? `${route.path}/index.html` : '/index.html'
        // When options.generate.subFolders is false
        // const normalizedRoute = route.path.replace(/\/$/, '') // Remove trailing slashes if they exist
        // const alias =
        //   route.path.length > 1 ? `${normalizedRoute}.html` : '/index.html'
        route.alias = alias

        if (route.path === '/') {
          route.redirect = '/login'
        }
      })
    },
    middleware: [
      'requiredAuth',
      'setBreadcrumb',
    ],
  }
}

global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement
