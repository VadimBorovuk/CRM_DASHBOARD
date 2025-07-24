<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="flex items-center justify-between mb-4">
      <p class="uppercase bold text-xl">About task</p>

      <UButton
          class="cursor-pointer rounded-full"
          variant="subtle"
          color="error"
          @click="deleteTask">Delete</UButton>
    </div>

    <KanbanSlideoverLabel label-text="Priority">
      {{ slideStore.card?.priority }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Status">
      <UBadge color="neutral" variant="outline">
        {{ slideStore.card?.status }}
      </UBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Performer">
      {{ slideStore.card?.performer }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Description">
      {{ slideStore.card?.description }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Create date">
      {{ dayjs(slideStore.card?.$createdAt).format('DD MMMM YYYY') }}
    </KanbanSlideoverLabel>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {useRuntimeConfig} from "#app";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {useTaskSlideStore} from "~/stores/slide-tasks.store";

const toast = useToast()
const props = defineProps({
  refetch: {
    type: Function
  }
})

const slideStore = useTaskSlideStore()

const config = useRuntimeConfig();
const { $appwrite } = useNuxtApp()

const {mutate} = useMutation({
  mutationKey: ['delete task', slideStore.card?.id],
  mutationFn: () => $appwrite.DB.deleteDocument(
      config.public.DB_ID,
      config.public.COLLECTION_TASKS,
      slideStore.card?.id,
     ),
  onSuccess() {
    props.refetch && props.refetch()
    slideStore.toggle()
    toast.add({
      title: 'Success',
      description: 'Task deleted successfully.',
      color: 'success',
    })
  },
})

const deleteTask = () => {
  mutate()
}

</script>
