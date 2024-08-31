// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        '@pinia/nuxt',
    ],
    css: ['~/assets/tailwind.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['@heroicons/vue'],
    },
    typescript: {
        strict: true,
        shim: false,
    },
})
