<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Crm System
    </h1>

    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
            v-for="(column, index) in data"
            :key="index"
            @dragover="handleDragOver"
            @drop="()=> handleDrop(column)"
            class="min-h-screen"
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
                class="mb-5 bg-sidebar cursor-pointer"
                @click="slideStore.set(card)"
                @dragstart="()=>handleDragStart(card, column)"
                draggable="true">
              <SdnCardHeader role="button">
                <SdnCardTitle>{{ card.title }}</SdnCardTitle>
              </SdnCardHeader>

              <SdnCardContent>
                {{ card.priority }}
                {{ card.performer }}
              </SdnCardContent>
              <SdnCardFooter>{{ days(card.$createdAt).format('DD MMMM YYYY') }}</SdnCardFooter>
            </SdnCard>
          </div>
        </div>
      </div>

      <KanbanSlideover/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery} from "~/composables/useKanbanQuery";

useHead({
  title: "Home | CRM System"
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

const slideStore = useTaskSlideStore()

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
    refetch()
  },
})

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({
      docId: dragCardRef.value.id,
      status: targetColumn.id
    })
  }
}

</script>
