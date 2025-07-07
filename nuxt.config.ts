// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import {runtimeEnvConfig} from "./config/runtimeEnv";

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify'
  },
  app: {
    baseURL: '/'
  },
  compatibilityDate: '2025-05-15',
  devtools: {enabled: true},
  css: ['~/assets/css/tailwind.css'],
  modules: [
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
  ],
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
  runtimeConfig: runtimeEnvConfig,
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
