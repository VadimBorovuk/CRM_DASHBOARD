// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import {runtimeEnvConfig} from "./config/runtimeEnv";

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify'
  },
  app: {
    head: {
      link: [{rel: "icon", type: "image/png", href: `/favicon.png`}],
    },
    baseURL: `/`
  },
  compatibilityDate: '2025-05-15',
  devtools: {enabled: true},
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    'shadcn-nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300]
        }
      }
    }
    ],
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/color-mode',
  ],
  plugins: ['~/plugins/vue-query.ts'],
  veeValidate: {
    autoImports: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'sdn',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir:
        './components/ui'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    preference: 'dark',
    dataValue: 'theme',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  runtimeConfig: runtimeEnvConfig,
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
