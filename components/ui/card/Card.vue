<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-3 rounded-lg border animation transition-colors border-transparent py-3 hover:border-[#a252c83d]',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@keyframes show {
  from{
    @apply border-[#a252c83d];
    transform: scale(.5) translateY(-30px);
    opacity: .4;
  }
  90% {
    @apply border-[a252c83d]
  }
  to{
    @apply border-transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
.animation {
  animation: show .3s ease-in-out;
}
</style>
