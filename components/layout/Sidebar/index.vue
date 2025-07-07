<template>
  <aside class="px-5 py-8 relative h-full w-full bg-sidebar">
    <NuxtLink to="/" class="flex items-center justify-center mb-3 cursor-pointer">
      <NuxtImg class="w-16" src="/dashboard.png"/>
    </NuxtLink>

    <div
        class="absolute top-2 right-3 translation-colors hover:text-fuchsia-700 cursor-pointer"
        @click="logout"
    >
      <Icon name="line-md:logout" size="22"/>
    </div>

    <LayoutMenu/>
  </aside>
</template>

<script setup lang="ts">
import {useAuthStore, useLoadingStore} from "~/stores/auth.store";

const { $appwrite } = useNuxtApp()
const isLoadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  try {
    await $appwrite.account.deleteSession('current')
    authStore.clear()
    await router.push('/login')
  } catch (e) {
    console.log(e)
  } finally {
    isLoadingStore.set(false)
  }
}
</script>

<style scoped>

</style>
