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
      <UForm :validate="validateUpdate"
             :state="{}" class="space-y-4"
             @submit="onSubmit">
<!--        <UFormField name="lang" class="mb-3" :label="$t('t.filter.lang')">-->
<!--          <USelectMenu-->
<!--              class="w-full"-->
<!--              searchable-->
<!--              clear-search-on-close-->
<!--              size="lg"-->
<!--              v-model="translateStore.objCreateTranslation.lang"-->
<!--              :items="languages"-->
<!--              value-key="code"-->
<!--              label-key="name"-->
<!--              :search-input="{-->
<!--                      placeholder: $t('t.filter.lang'),-->
<!--                      icon: 'i-lucide-search'-->
<!--                    }"-->
<!--              :placeholder="$t('t.filter.lang')"-->
<!--          />-->
<!--          &lt;!&ndash;          <div class="flex items-center">&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="min-w-[90px] max-w-[90px] break-words mr-2">&ndash;&gt;-->
<!--          &lt;!&ndash;              {{ $t('t.filter.lang') }}&ndash;&gt;-->
<!--          &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          &lt;!&ndash;            &lt;!&ndash;         content&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </UFormField>-->

        <UFormField name="code" class="mb-3" label="Title">
          <UInput
              v-model.trim="title"
              size="lg"
              v-bind="titleAttrs"
              class="w-full"
              placeholder="Enter title"/>
        </UFormField>

<!--        <UFormField name="value" class="mb-3" :label="$t('t.filter.value')">-->
<!--          <UInput-->
<!--              v-model.trim="translateStore.objCreateTranslation.value"-->
<!--              size="lg"-->
<!--              class="w-full"-->
<!--              :placeholder="$t('t.filter.value')"/>-->
<!--          -->
<!--        </UFormField>-->

        <UButton
            size="lg"
            class="bg-waterloo-700 font-bold hover:bg-waterloo-600 dark:bg-waterloo-50 hover:dark:bg-waterloo-200 transition duration-300 ease-in-out cursor-pointer"
            type="submit">
          Update
        </UButton>
      </UForm>
    </template>
  </UModal>



<!--          <form-->
<!--              @submit="onSubmit"-->
<!--              class="form mb-5"-->
<!--          >-->
<!--            <SdnInput-->
<!--                v-model="title"-->
<!--                v-bind="titleAttrs"-->
<!--                name="title"-->
<!--                placeholder="Enter title"-->
<!--                type="text" class="w-full mb-4 rounded-2xl border border-white text-white"-->
<!--            />-->
<!--            <SdnTextarea-->
<!--                v-model="description"-->
<!--                v-bind="descriptionAttrs"-->
<!--                name="description"-->
<!--                placeholder="Enter description"-->
<!--                class="w-full mb-4 rounded-2xl border border-white text-white"-->
<!--            />-->

<!--            <Select v-model="priority" v-bind="priorityAttrs">-->
<!--              <SelectTrigger class="w-full mb-4 rounded-2xl border border-white text-white">-->
<!--                <SelectValue placeholder="Select a priority"/>-->
<!--              </SelectTrigger>-->
<!--              <SelectContent>-->
<!--                <SelectGroup>-->
<!--                  <SelectLabel>Priority</SelectLabel>-->
<!--                  <SelectItem v-for="item in PRIORITY_DATA" :value="item.id" :key="item.id">-->
<!--                    {{ item.name }}-->
<!--                  </SelectItem>-->
<!--                </SelectGroup>-->
<!--              </SelectContent>-->
<!--            </Select>-->

<!--            <Select v-model="status" v-bind="statusAttrs">-->
<!--              <SelectTrigger class="w-full mb-4 rounded-2xl border border-white text-white">-->
<!--                <SelectValue placeholder="Select a status"/>-->
<!--              </SelectTrigger>-->
<!--              <SelectContent>-->
<!--                <SelectGroup>-->
<!--                  <SelectLabel>Priority</SelectLabel>-->
<!--                  <SelectItem v-for="item in STATUS_DATA" :value="item.id" :key="item.id">-->
<!--                    {{ item.name }}-->
<!--                  </SelectItem>-->
<!--                </SelectGroup>-->
<!--              </SelectContent>-->
<!--            </Select>-->


<!--          </form>-->
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {useRuntimeConfig} from "#app";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {useTaskSlideStore} from "~/stores/slide-tasks.store";
import {useConfigPriority} from "~/composables/useConfigPriority";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
import {PRIORITY_DATA, STATUS_DATA} from "~/components/kanban/kanban.data";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue
// } from "~/components/ui/select";
import {useForm} from "vee-validate";
import type {ITask} from "~/types/tasks.types";

interface ITaskFormState extends Pick<ITask, 'title' | 'description' | 'priority'> {
  performer: {
    email: string
    name: string
  }
  status: string
}

const validateUpdate = (state) => {
  const errors = []

  if (!state.lang) errors.push({name: 'lang', message: 't.label.error.lang'})
  if (!state.code) errors.push({name: 'code', message: 't.label.error.code'})
  if (!state.value) errors.push({name: 'value', message: 't.label.error.value'})

  return errors
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

