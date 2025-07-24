<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Dashboard | Crm System
    </h1>

    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
            v-for="(column, index) in data"
            :key="index"
            @dragover="(e) => handleDragOver(e, column)"
            @dragleave="(e) => handleDragLeave(e, column)"
            @drop="() => handleDrop(column)"
            class="min-h-screen rounded transition-all duration-200"
            :class="{
    'outline outline-2 outline-fuchsia-800': dragOverColumnId === column.id
  }"
        >
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
               :style="generalColumnsStyles(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateTask
                :refetch="refetch"
                :status="column.id"
            />
            <SdnCard
                v-for="card in column.items"
                class="mb-5 bg-sidebar cursor-pointer rounded-2xl"
                :class="getColorStatus(card.priority)"
                @click="slideStore.set(card)"
                @dragstart="()=>handleDragStart(card, column)"
                draggable="true">
              <SdnCardHeader role="button">
                <SdnCardTitle class="text-xl">{{ card.title }}</SdnCardTitle>
              </SdnCardHeader>
              <USeparator />

              <SdnCardContent class="flex items-center">
                <div class="max-w-[30px] mr-2">
                  <img class="rounded-full" :src="card.performer?.avatar_url" alt="logo">
                </div>
                <p class="text-xs font-bold">{{ card.performer?.name }}</p>
              </SdnCardContent>
              <SdnCardFooter class="flex flex-col items-start">
                <p class="text-xs mr-2 text-gray-300">Created:</p>
                <p class="text-xs font-bold">
                   {{ days(card.$createdAt).format('DD MMMM YYYY') }}
                </p>
              </SdnCardFooter>
            </SdnCard>
          </div>
        </div>
      </div>

      <KanbanSlideover :refetch="refetch"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery} from "~/composables/useKanbanQuery";

useSeoMeta({
  title: "Dashboard | CRM System"
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const {data, isLoading, refetch} = useKanbanQuery()
import days from "dayjs"
import {useMutation} from "@tanstack/vue-query";
import type {EnumStatus} from "~/types/tasks.types";
import {useRuntimeConfig} from "#app";
import {generalColumnsStyles} from "~/composables/useColorStatus";

type TypeMutationVariables = {
  docId: string
  status?: EnumStatus
}

const config = useRuntimeConfig();
const {$appwrite} = useNuxtApp()
const {DB} = $appwrite

const dragOverColumnId = ref<string | null>(null)
const slideStore = useTaskSlideStore()

const getColorStatus = (priority: number) => {
  switch (priority) {
    case 1:
      return 'border-3 border-b-blue-600'
    case 2:
      return 'border-3 border-b-yellow-600'
    case 3:
      return 'border-3 border-b-red-600'
    default:
      return ''
  }
}

const {mutate} = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({docId, status}: TypeMutationVariables) =>
      DB.updateDocument(
          config.public.DB_ID,
          config.public.COLLECTION_TASKS,
          docId,
          {status}
      ),
  onSuccess(data, variables, context) {
    console.log(data)
    refetch()
  },
})

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent, column: IColumn) {
  event.preventDefault()
  dragOverColumnId.value = column.id
}

function handleDragLeave(event: DragEvent, column: IColumn) {
  // Якщо миша пішла з цієї колонки — прибираємо підсвічування
  if (dragOverColumnId.value === column.id) {
    dragOverColumnId.value = null
  }
}

function handleDrop(targetColumn: IColumn) {
  dragOverColumnId.value = null // прибираємо підсвічування після дропу
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({
      docId: dragCardRef.value.id,
      status: targetColumn.id
    })
  }
}

</script>
