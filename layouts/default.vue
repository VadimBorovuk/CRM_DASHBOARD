<template>
  <LayoutLoader v-if="isLoadingStore.isLoading"/>
  <section
      v-else
      :class="{grid: authStore.isAuth}"
      style="min-height: 100vh;"
  >
    <LayoutSidebar v-if="authStore.isAuth"/>
    <div>
      <slot/>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useAuthStore, useLoadingStore} from "~/stores/auth.store";

const isLoadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const { $appwrite } = useNuxtApp()

onMounted(async () => {
  try {
    const user = await $appwrite.account.get()
    if (user) authStore.set(user)
  } catch (e) {
    router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
})

</script>

<style scoped>
.grid {
  grid-template-columns: 1fr 6fr;
}
</style>
