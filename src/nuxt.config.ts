/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NuxtRouteConfig } from '@nuxt/types/config/router';
import type { NuxtConfig } from '@nuxt/types';
// @ts-expect-error - Individual icons doesn't have typings
import jellyfinIcon from 'simple-icons/icons/jellyfin';

const config: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: !!process.env.NUXT_SSR,
  /*
   ** Disables telemetry prompt while installing dependencies
   ** See https://github.com/nuxt/telemetry
   */
  telemetry: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Module loading mode
   ** See https://nuxtjs.org/api/configuration-modern
   */
  modern: 'client',
  /*
   ** Progress bar between routes
   ** See https://nuxtjs.org/api/configuration-loading
   */
  loading: {
    color: '#00A4DC',
    failedColor: '#FF5252',
    height: '4px'
  },
  pwa: {
    meta: {
      nativeUI: true,
      appleStatusBarStyle: 'black-translucent',
      name: 'Jellyfin',
      theme_color: '#1c2331'
    },
    manifest: {
      name: 'Jellyfin',
      background_color: '#14141F'
    }
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - Jellyfin',
    title: 'Jellyfin',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/global.scss',
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/src/styles/styles.sass'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // General
    'plugins/persistedStatePlugin.ts',
    'plugins/appInitPlugin.ts',
    'plugins/veeValidate.ts',
    'plugins/nativeWebsocketPlugin.ts',
    // Components
    { src: 'plugins/components/swiper.ts', mode: 'client' },
    'plugins/components/vueVirtualScroller.ts',
    'plugins/components/veeValidate.ts',
    { src: 'plugins/components/vueFullscreen.ts', mode: 'client' },
    // Utility
    'plugins/browserDetectionPlugin.ts',
    { src: 'plugins/playbackProfilePlugin.ts', mode: 'client' },
    'plugins/supportedFeaturesPlugin.ts',
    'plugins/apiPlugin.ts',
    // Directives
    'plugins/directives/hide.ts'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [{ path: '~/components', pathPrefix: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/date-fns',
    '@nuxtjs/imagemin'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/i18n',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
   ** Router configuration
   */
  router: {
    middleware: ['auth'],
    extendRoutes(routes: NuxtRouteConfig[]): void {
      // Extend all routes to be accessed by /index.html
      for (const route of routes) {
        if (route.path.slice(-1) === '/') {
          route.alias = route.path + 'index.html';
        } else {
          route.alias = route.path + '/index.html';
        }
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: ''
  },
  /*
   ** Axios-based Authentication
   ** See https://auth.nuxtjs.org/schemes/local.html#options
   */
  auth: {
    redirect: {
      login: '/server/login',
      logout: '/server/login',
      callback: false,
      home: '/'
    },
    strategies: {
      jellyfin: {
        _scheme: '~/schemes/jellyfinScheme'
      }
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/'
      }
    },
    plugins: [
      '~/plugins/userLibraryPlugin.ts',
      '~/plugins/itemsPlugin.ts',
      '~/plugins/tvShowsPlugin.ts',
      '~/plugins/playbackPlugin.ts'
    ]
  },
  i18n: {
    locales: [
      { code: 'am', iso: 'am', name: '????????????', file: 'am.json' },
      { code: 'ar', iso: 'ar', name: '??????????????', file: 'ar.json' },
      {
        code: 'be',
        iso: 'be',
        name: '???????????????????? ????????',
        file: 'be_Latn.json'
      },
      { code: 'ca', iso: 'ca', name: 'Catal??', file: 'ca.json' },
      { code: 'cs', iso: 'cs', name: '??e??tina', file: 'cs.json' },
      { code: 'de', iso: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'el', iso: 'el', name: '????????????????', file: 'el.json' },
      { code: 'en-US', iso: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'eo', iso: 'eo', name: 'Esperanto', file: 'eo.json' },
      { code: 'es', iso: 'es', name: 'Espa??ol', file: 'es.json' },
      {
        code: 'es-419',
        iso: 'es-419',
        name: 'Espa??ol (Am??rica Latina)',
        file: 'es_419.json'
      },
      { code: 'fa', iso: 'fa', name: '??????????', file: 'fa.json' },
      { code: 'fi', iso: 'fi', name: 'Suomi', file: 'fi.json' },
      { code: 'fil', iso: 'fil', name: 'Pilipino', file: 'fil.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Fran??ais', file: 'fr-FR.json' },
      { code: 'he', iso: 'he', name: '??????????', file: 'he.json' },
      { code: 'hi', iso: 'hi', name: '??????????????????', file: 'hi.json' },
      { code: 'hu', iso: 'hu', name: 'Magyar', file: 'hu.json' },
      { code: 'id', iso: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'it', iso: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'ja', iso: 'ja', name: '?????????', file: 'ja.json' },
      { code: 'kk', iso: 'kk', name: '?????????? ????????', file: 'kk.json' },
      { code: 'ko', iso: 'ko', name: '?????????', file: 'ko.json' },
      { code: 'lt', iso: 'lt', name: 'Lietuvi?? kalba', file: 'lt.json' },
      { code: 'ml', iso: 'ml', name: '??????????????????', file: 'ml.json' },
      { code: 'ms', iso: 'ms', name: '???????? ?????????????', file: 'ms.json' },
      { code: 'nb', iso: 'nb-NO', name: 'Norsk', file: 'nb_NO.json' },
      { code: 'nl', iso: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'nn', iso: 'nn', name: 'Norsk Nynorsk', file: 'nn.json' },
      { code: 'pa', iso: 'pa', name: '??????????????????', file: 'pa.json' },
      { code: 'pl', iso: 'pl', name: 'Polski', file: 'pl.json' },
      { code: 'pt', iso: 'pt', name: 'Portugu??s', file: 'pt.json' },
      {
        code: 'pt-BR',
        iso: 'pt-BR',
        name: 'Portugu??s (Brasil)',
        file: 'pt_BR.json'
      },
      { code: 'ro', iso: 'ro', name: 'Rom??n??', file: 'ro.json' },
      { code: 'ru', iso: 'ru', name: '??????????????', file: 'ru.json' },
      { code: 'sk', iso: 'sk', name: 'Sloven??ina', file: 'sk.json' },
      { code: 'sl', iso: 'sl', name: 'Sloven????ina', file: 'sl.json' },
      {
        code: 'sr-Latn',
        iso: 'sr',
        name: '???????????? ??????????',
        file: 'sr_Latn.json'
      },
      { code: 'sv', iso: 'sv', name: 'Svenska', file: 'sv.json' },
      { code: 'sw', iso: 'sw', name: 'Kiswahili', file: 'sw.json' },
      { code: 'ta', iso: 'ta', name: '???????????????', file: 'ta.json' },
      { code: 'tr', iso: 'tr', name: 'T??rk??e', file: 'tr.json' },
      { code: 'uk', iso: 'uk', name: '????????????????????', file: 'uk.json' },
      { code: 'ur', iso: 'ur', name: '????????', file: 'ur.json' },
      { code: 'vi', iso: 'vi', name: 'Ti???ng Vi???t', file: 'vi.json' },
      { code: 'zh-CN', iso: 'zh-CN', name: '????????????', file: 'zh_Hans.json' },
      { code: 'zh-TW', iso: 'zh-TW', name: '????????????', file: 'zh_Hant.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
    defaultLocale: 'en-US',
    vueI18n: {
      fallbackLocale: 'en-US'
    }
  },
  dateFns: {
    locales: [
      'am',
      'ar',
      'be',
      'ca',
      'cs',
      'de',
      'el',
      'en-US',
      'es',
      'es419',
      'fi',
      'fr',
      'he',
      'hi',
      'hu',
      'id',
      'it',
      'ja',
      'kk',
      'ko',
      'lt',
      'ml',
      'ms',
      'nb',
      'nl',
      'nn',
      'pa',
      'pl',
      'pt',
      'pt-BR',
      'ro',
      'ru',
      'sk',
      'sl',
      'sr-Latn',
      'sv',
      'sw',
      'ta',
      'tr',
      'uk',
      'ur',
      'vi',
      'zh-CN',
      'zh-TW'
    ],
    defaultLocale: 'en-US',
    fallbackLocale: 'en-US'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      dark: true,
      default: 'dark',
      disable: false,
      themes: {
        dark: {
          primary: '#9d37c2',
          secondary: '#2f3951',
          accent: '#FF4081',
          info: '#0099CC',
          warning: '#FB8C00',
          error: '#FF5252',
          success: '#4CAF50',
          background: '#14141F',
          card: '#1c2331',
          thumb: '#252e41'
        },
        light: {
          primary: '#9d37c2',
          secondary: '#424242',
          accent: '#FF4081',
          info: '#33b5e5',
          warning: '#FB8C00',
          error: '#FF5252',
          success: '#4CAF50',
          background: '#f2f2f2',
          card: '#FFFFFF',
          thumb: '#000000'
        }
      },
      options: {
        customProperties: true
      }
    },
    icons: {
      iconfont: 'mdi',
      values: {
        jellyfin: jellyfinIcon.path
      }
    }
  },
  loadingIndicator: {
    name: 'circle',
    color: '#0086b3',
    background: '#14141F'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    loadingScreen: {
      image: 'icon.png',
      colors: {
        client: '#00A4DC',
        modern: '#aa5cc3',
        server: '#424242'
      }
    },
    optimizeCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 800000
      }
    },
    extractCSS: {
      ignoreOrder: true
    },
    babel: {
      compact: true,
      presets(_context, [preset, options]) {
        return [
          [
            preset,
            {
              ...options,
              corejs: { version: 3 }
            }
          ]
        ];
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    extend(config, ctx): void {
      if (ctx.isClient) {
        config?.module?.rules.push({
          test: /\.worker\.ts$/,
          use: [
            {
              loader: 'comlink-loader',
              options: {
                singleton: true
              }
            }
          ],
          exclude: /(node_modules)/
        });
      }
    },
    transpile: ['@nuxtjs/auth', 'vee-validate/dist/rules']
  },

  /**
   * Host set to 0.0.0.0 in order to access the dev server on the LAN
   */
  server: {
    host: '0.0.0.0'
  }
};

// Add context-dependent modules to the build
if (process.env.NUXT_SSR) {
  config.buildModules?.push('@nuxtjs/pwa');
} else {
  config.modules?.push('@nuxtjs/pwa');
}

if (process.env.NODE_ENV === 'development') {
  config.plugins?.push({ src: 'plugins/axe.ts', mode: 'client' });
}

export default config;
