// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    app: {
        head: {
            htmlAttrs: {
                dir: 'rtl',
                lang: 'fa'
            }
        }
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: "http://laravel9-api-project-ecommerce.test/api/admin-panel"
        }
    },

    css: ["~/assets/css/main.css"],

    // for old browser
    build: {
        transpile: ['vue-toastification'],
    }
})
