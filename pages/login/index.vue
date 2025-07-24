<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="font-bold text-2xl text-center mb-5">Login</h1>

      <form>
        <SdnInput
            v-model="nameRef"
            placeholder="Enter name" type="text" class="mb-3"/>
        <SdnInput
            v-model="emailRef"
            placeholder="Enter email" type="email" class="mb-3"/>
        <SdnInput
            v-model="passwordRef"
            placeholder="Enter password" type="password" class="mb-3"/>
        <div class="flex items-center justify-center flex-wrap gap-5 mt-6">
          <SdnButton class="cursor-pointer" type="button" @click="login">Login</SdnButton>
          <SdnButton class="cursor-pointer" type="button" @click="register">Register</SdnButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore, useLoadingStore} from "~/stores/auth.store";
import {v4 as uuid} from "uuid"

useHead({
  title: "Login"
})
const {$appwrite} = useNuxtApp()
const isLoadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const nameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')

const login = async () => {
  try {
    isLoadingStore.set(true)
    await $appwrite.account.createEmailPasswordSession(emailRef.value, passwordRef.value)
    const response = await $appwrite.account.get()
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status
      })
    }
    emailRef.value = ""
    passwordRef.value = ""
    nameRef.value = ""

    await router.push('/')
    isLoadingStore.set(false)
  } catch (e) {
    isLoadingStore.set(false)
  }
}

const register = async () => {
  await $appwrite.account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value)
  await login()
}
</script>
