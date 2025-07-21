<template>
  <section class="bg-gray-900 h-screen">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="text-7xl mb-24 tracking-tight font-extrabold lg:text-9xl text-white">404</h1>
        <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Page not found currently</p>
        <p class="mb-4 text-lg font-light text-gray-300">Sorry, we can't find such page.</p>
        <UButton
            color="neutral" variant="outline"
            @click="navigateTo('/')"
            class="text-white cursor-pointer bg-waterloo-600 hover:bg-waterloo-500 focus:outline-none focus:ring-1 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
          Back to main page
        </UButton>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {navigateTo} from "#app";
</script>
