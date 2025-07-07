<template>
  <div>
    <NuxtLink
        v-for="item in MENU_DATA"
        :to="item.url"
        :key="item.name"
        class="flex items-center pl-3 pr-2 p-2 rounded-3xl w-full hover:bg-fuchsia-800 hover:text-white transition-all mb-3"
        active-class="text-fuchsia-400 font-bold">
      <Icon :name="item.icon" class="mr-3"/>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

import {MENU_DATA} from "~/components/layout/Menu/menu.data";
</script>

