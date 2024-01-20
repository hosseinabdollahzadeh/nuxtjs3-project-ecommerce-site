// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs:{
        dir: 'rtl',
        lang: 'fa'
      }
    }
  },
  runtimeConfig:{
    public: {
      apiBaseUrl: "http://laravel9-api-project-ecommerce.test/api"
    }
  },
  css: ["~/assets/css/main.css"],

  modules: ['@formkit/nuxt', '@pinia/nuxt'],

  // for old browser
  build:{
    transpile: ['vue-toastification'],
  }

})
