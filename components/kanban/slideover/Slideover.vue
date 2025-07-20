<template>
  <USlideover v-model:open="isLocalOpen"
              :overlay="false">
    <template #content>
      <UCard
          class="overflow-y-auto min-h-[350px]"
      >
        <KanbanSlideoverTop/>
      </UCard>
      <div class="p-6 overflow-y-auto">
        <KanbanSlideoverComment/>
      </div>

    </template>

  </USlideover>
</template>

<script setup lang="ts">
import {useTaskSlideStore} from "~/stores/slide-tasks.store";

const slideStore = useTaskSlideStore()

const isLocalOpen = computed({
  get:() => slideStore.isOpen,
  set: (value) =>{
    slideStore.isOpen = value
  }
})
</script>

