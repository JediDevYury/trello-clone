// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui', '@pinia/nuxt', "@vueuse/nuxt"],
  css: ['assets/css/velo.css'],
  colorMode: {
    preference: 'light'
  }
})