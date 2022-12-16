import i18n from './plugins/i18n'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  
  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Experiencia COA Dental',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://experiencia.coadental.com/img/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/custom.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vuetify.js',
    '~/plugins/components.js',
    '~/plugins/mixin.js',
    '~/plugins/dialogs.js',
    '~/plugins/upload-component.js',
    '~/plugins/alerts.js',
    '~/plugins/snackbars.js',
    '~/plugins/vueper.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/toast',
    'vue-scrollto/nuxt',
    'nuxt-material-design-icons-iconfont',
    '@nuxtjs/firebase'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
  },
  i18n: {
    locales: [
        { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
        { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'es',
    seo: true,
    lazy: true,
    langDir: '@/locales',
    vueI18n: i18n,
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        onlyOnRoot: true, // recommended
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  firebase: {
    config: {
      apiKey: "AIzaSyAqwTg0zjPmQBuT-n_eNc9a692o6a5LHkA",
      authDomain: "tradehouse-sitio.firebaseapp.com",
      databaseURL: "https://tradehouse-sitio-default-rtdb.firebaseio.com",
      projectId: "tradehouse-sitio",
      storageBucket: "tradehouse-sitio.appspot.com",
      messagingSenderId: "508996122906",
      appId: "1:508996122906:web:d522780be07fb57fe014a3",
      measurementId: "G-7LSJSB107Z"
     },
    services: {
        auth: {
          persistence: 'session',
          initialize:{
            onAuthStateChangedMutation: "setUser",
            onAuthStateChangedAction: 'onAuthStateChangedAction',
          }
        },
        firestore: true,
        storage: true,
        messaging: true,
        performance: true,
        analytics: true,
        database: true,
        functions: {
            location: 'us-central1',
            emulatorPort: 5001,
        }
    }
  },vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
        customProperties: true
    }
  },
  moment: {
    defaultLocale: 'es',
    locales: ['es']
  },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      postcss: null
    }
}
