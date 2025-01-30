// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-lodash'],
  runtimeConfig: {
    public: {
      tmdbToken: '',
    }
  },
  typescript: {
    typeCheck: true
  },
  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  }
})