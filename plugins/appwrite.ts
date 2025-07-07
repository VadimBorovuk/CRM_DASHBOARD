import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { Client, Account, Databases, Storage, ID } from 'appwrite'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const client = new Client()
      .setEndpoint(config.public.CRM_URL)
      .setProject(config.public.APP_WRITE_ID)

  const account = new Account(client)
  const DB = new Databases(client)
  const storage = new Storage(client)

  return {
    provide: {
      appwrite: {
        client,
        account,
        DB,
        storage,
        ID,
      }
    }
  }
})
