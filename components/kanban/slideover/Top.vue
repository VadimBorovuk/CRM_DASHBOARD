<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="flex items-center justify-between mb-4">
      <p class="uppercase bold text-xl">{{ slideStore.card?.title }}</p>

      <div class="flex items-center">
        <UButton
            class="cursor-pointer rounded-2xl mr-2"
            variant="subtle"
            color="primary"
            @click="editTask"
        >
          <Icon
              name="radix-icons:pencil-2"
              class="cursor-pointer"
              size="20"
          />
        </UButton>

        <UPopover v-model:open="statusDeleteTask">
          <UButton
              class="cursor-pointer rounded-2xl"
              variant="subtle"
              color="error"
              @click="openTaskDelete"
          >
            <Icon
                name="ic:baseline-delete-forever"
                class="cursor-pointer"
                size="20"
            />
          </UButton>

          <template #content>
            <div class="p-3">
              <h2>Are you sure?</h2>
              <div class="flex items-center justify-around mt-3">
                <UButton
                    class="cursor-pointer rounded-2xl"
                    variant="outline"
                    color="primary"
                    @click="statusDeleteTask = !statusDeleteTask">No
                </UButton>
                <UButton
                    class="cursor-pointer rounded-2xl"
                    variant="subtle"
                    color="error"
                    @click="deleteTask">Yes
                </UButton>
              </div>
            </div>
          </template>
        </UPopover>
      </div>

    </div>

    <KanbanSlideoverLabel label-text="Priority">
      <UBadge :color="useConfigPriority(slideStore.card?.priority)?.style" variant="outline">
        {{ useConfigPriority(slideStore.card?.priority)?.name }}
      </UBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Status">
      <UBadge color="neutral" variant="outline">
        {{ STATUS_DATA.find(elem => elem.id === slideStore.card?.status)?.name || slideStore.card?.status }}
      </UBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Performer">
      <div class="flex mt-2">
        <img class="rounded-2xl h-[35px] w-[35px] object-cover mr-3 border-2 border-gray-500" height="30" width="30"
             :src="slideStore.card?.performer?.avatar_url" alt="logo">
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

  <!--  Modal edit task-->
  <UModal v-model:open="statusUpdateTask" title="Update task"
  >
    <template #body>
      <UForm
          :state="{}" class="space-y-4"
          @submit="onSubmit">

        <UFormField name="title" class="mb-3" label="Title">
          <UInput
              v-model.trim="title"
              size="lg"
              v-bind="titleAttrs"
              class="w-full"
              placeholder="Enter title"/>
        </UFormField>

        <UFormField name="description" class="mb-3" label="Description">
          <UTextarea
              v-model.trim="description"
              size="lg"
              v-bind="descriptionAttrs"
              class="w-full"
              placeholder="Enter description"/>
        </UFormField>

        <UFormField name="priority" class="mb-3" label="Priority">
          <USelectMenu
              class="w-full"
              searchable
              clear-search-on-close
              size="lg"
              v-model="priority"
              v-bind="priorityAttrs"
              :items="PRIORITY_DATA"
              value-key="id"
              label-key="name"
              :search-input="{
                              placeholder: 'Search priority',
                              icon: 'i-lucide-search'
                            }"
              placeholder="Select priority"
          />
        </UFormField>

        <UFormField name="status" class="mb-3" label="Status">
          <USelectMenu
              class="w-full"
              searchable
              clear-search-on-close
              size="lg"
              v-model="status"
              v-bind="statusAttrs"
              :items="STATUS_DATA"
              value-key="id"
              label-key="name"
              :search-input="{
                              placeholder: 'Search status',
                              icon: 'i-lucide-search'
                            }"
              placeholder="Select status"
          />
        </UFormField>

        <div class="flex justify-end mt-5">
          <UButton
              color="neutral"
              size="xl"
              class="font-bold transition duration-300 ease-in-out cursor-pointer rounded-3xl"
              type="submit">
            Update
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {useRuntimeConfig} from "#app";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {useTaskSlideStore} from "~/stores/slide-tasks.store";
import {useConfigPriority} from "~/composables/useConfigPriority";
import {PRIORITY_DATA, STATUS_DATA} from "~/components/kanban/kanban.data";
import {useForm} from "vee-validate";
import type {ITask} from "~/types/tasks.types";

interface ITaskFormState extends Pick<ITask, 'title' | 'description' | 'priority'> {
  performer: {
    email: string
    name: string
  }
  status: string
}

const statusDeleteTask = ref(false)
const statusUpdateTask = ref(false)
const taskCurrentId = ref('')

const toast = useToast()
const props = defineProps({
  refetch: {
    type: Function
  }
})

const slideStore = useTaskSlideStore()
const config = useRuntimeConfig();
const {$appwrite} = useNuxtApp()

const {handleSubmit, defineField, setValues, values} = useForm<ITaskFormState>()
const {data: dataTask, isLoading: isLoadingTask} = useQuery({
  queryKey: ['get task', taskCurrentId.value],
  queryFn: () => $appwrite.DB.getDocument(
      config.public.DB_ID,
      config.public.COLLECTION_TASKS,
      taskCurrentId.value
  ),
  enabled: computed(() => !!taskCurrentId.value),
})
const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [priority, priorityAttrs] = defineField('priority')
const [status, statusAttrs] = defineField('status')


const {mutate: updateMutate, isPending} = useMutation({
  mutationKey: ['update task', taskCurrentId.value],
  mutationFn: (data: ITaskFormState) =>
      $appwrite.DB.updateDocument(
          config.public.DB_ID,
          config.public.COLLECTION_TASKS,
          taskCurrentId.value,
          data
      ),
  onSuccess(data, variables, context) {
    props.refetch && props.refetch()
    statusUpdateTask.value = !statusUpdateTask.value
    slideStore.toggle()
    toast.add({
      title: 'Success',
      description: `Task updated successfully.`,
      color: 'success',
    })
  },
})

const {mutate: deleteMutate} = useMutation({
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

const openTaskDelete = () => {
  statusDeleteTask.value = true
}

const editTask = () => {
  taskCurrentId.value = slideStore.card?.id
  statusUpdateTask.value = true
}

const deleteTask = () => {
  statusDeleteTask.value = false
  deleteMutate()
}

const onSubmit = handleSubmit(values => {
  updateMutate(values)
})

watch(dataTask, (newData) => {
  if (!newData) return

  const initialData = newData as unknown as ITaskFormState
  setValues({
    title: initialData?.title,
    description: initialData?.description,
    status: initialData?.status,
    priority: initialData?.priority,
  })
})
</script>

