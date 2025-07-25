<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="flex items-center justify-between mb-4">
      <p class="uppercase bold text-xl">{{ slideStore.card?.title }}</p>

      <UPopover v-model:open="statusDeleteTask">
        <UButton
            class="cursor-pointer rounded-full"
            variant="subtle"
            color="error"
            @click="openPopoverDelete">
          Delete
        </UButton>

        <template #content>
          <div class="p-3">
            <h2>Are you sure?</h2>
            <div class="flex items-center justify-around mt-3">
              <UButton
                  class="cursor-pointer rounded-full"
                  variant="outline"
                  color="primary"
                  @click="statusDeleteTask = !statusDeleteTask">No
              </UButton>
              <UButton
                  class="cursor-pointer rounded-full"
                  variant="subtle"
                  color="error"
                  @click="deleteTask">Yes
              </UButton>
            </div>

          </div>

        </template>
      </UPopover>
    </div>

    <KanbanSlideoverLabel label-text="Priority">
      <UBadge :color="useConfigPriority(slideStore.card?.priority)?.style" variant="outline">
        {{ useConfigPriority(slideStore.card?.priority)?.name }}
      </UBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Status">
      <UBadge color="neutral" variant="outline">
        {{ slideStore.card?.status }}
      </UBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Performer">
      <div class="flex mt-2">
        <img class="rounded-full mr-3" height="30" width="30" :src="slideStore.card?.performer?.avatar_url" alt="logo">
        <span>{{ slideStore.card?.performer?.name }}</span>
      </div>

    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Description">
      <p> {{ slideStore.card?.description }}</p>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Create date">
      <p> {{ dayjs(slideStore.card?.$createdAt).format('DD MMMM YYYY') }}</p>
    </KanbanSlideoverLabel>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {useRuntimeConfig} from "#app";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {useTaskSlideStore} from "~/stores/slide-tasks.store";
import {useConfigPriority} from "~/composables/useConfigPriority";

const statusDeleteTask = ref(false)
const toast = useToast()
const props = defineProps({
  refetch: {
    type: Function
  }
})

const slideStore = useTaskSlideStore()

const config = useRuntimeConfig();
const {$appwrite} = useNuxtApp()

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
      description: `Task "${slideStore.card?.title}" deleted successfully.`,
      color: 'success',
    })
  },
})

const openPopoverDelete = () => {
  statusDeleteTask.value = true
}

const deleteTask = () => {
  statusDeleteTask.value = false
  mutate()
}

</script>
