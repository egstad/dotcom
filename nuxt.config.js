export default {
  globalName: 'app',
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Jordan Egstad — Graphic Designer and Web Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Hello world, I’m Jordan Egstad. I’m a graphic designer and web developer creating expressive and enduring brand identities, websites, apps, typefaces, and more.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Share variables, mixins, functions across all style files (no @import needed)
   */
  styleResources: {
    // your settings here
    scss: ['@/assets/scss/_vars.scss'],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/reset.scss', '@/assets/scss/typography.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    vendor: ['three'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
