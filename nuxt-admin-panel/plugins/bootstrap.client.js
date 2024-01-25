import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

export default defineNuxtPlugin(nuxtApp => {
    return nuxtApp.provide('bootstrap', bootstrap)
})