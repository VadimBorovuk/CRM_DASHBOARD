<template>
  <div class="text-center mb-2">
    <button
        @click="isOpenForm = !isOpenForm"
        class="transition-all opacity-8 hover:opacity-100 hover:text-[#a252c8] cursor-pointer">
      <Icon
          v-if="isOpenForm"
          name="radix-icons:arrow-up"
          class="fade-in-100 fade-out-0"
          size="40"
      />
      <Icon
          v-else
          name="radix-icons:plus-circled"
          class="fade-in-100 fade-out-0"
          size="40"
      />
    </button>
  </div>
  <form
      @submit="onSubmit"
      v-if="isOpenForm"
      class="form mb-5"
  >
    <SdnInput
        v-model="title"
        v-bind="titleAttrs"
        placeholder="Enter title"
        type="text" class="input mb-2"
    />
    <SdnInput
        v-model="description"
        v-bind="descriptionAttrs"
        placeholder="Enter description"
        type="text" class="input mb-2"
    />

    <Select v-model="priority" v-bind="priorityAttrs">
      <SelectTrigger class="w-full input mb-2 rounded-full border border-white">
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem v-for="item in PRIORITY_DATA" :value="item.id" :key="item.id">
            {{item.name}}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <SdnInput
        v-model="performerName"
        v-bind="performerNameAttrs"
        placeholder="Enter performer name"
        type="text" class="input mb-2"
    />

    <SdnInput
        v-model="performerEmail"
        v-bind="performerEmailAttrs"
        placeholder="Enter performer email"
        type="text" class="input mb-2"
    />

    <button
        class="w-full btn p-2 border border-b-fuchsia-600 cursor-pointer"
        :class="lengthDataValues ? 'opacity-30': ''"
        :disabled="isPending || lengthDataValues"
    >
      {{isPending ? 'Loading...' : 'Create'}}
    </button>
   </form>
</template>

<script setup lang="ts">
import {useRuntimeConfig} from "#app";
import {useMutation} from "@tanstack/vue-query";
import {v4 as uuid} from 'uuid'
import type {ITask} from "~/types/tasks.types";
import {useForm} from "vee-validate";
import {PRIORITY_DATA} from "~/components/kanban/kanban.data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel
} from '@/components/ui/select'

const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  refetch: {
    type: Function
  }
})
const toast = useToast()
const isOpenForm = ref(false)
const {$appwrite} = useNuxtApp()
const {DB} = $appwrite
const config = useRuntimeConfig();

interface ITaskFormState extends Pick<ITask, 'title' | 'description' | 'priority'> {
  performer: {
    email: string
    name: string
  }
  status: string
}

const {handleSubmit, defineField, handleReset} = useForm<ITaskFormState>({
  initialValues: {
    status: props.status,
    priority: 1
  }
})


const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [priority, priorityAttrs] = defineField('priority')
const [performerEmail, performerEmailAttrs] = defineField('performer.email')
const [performerName, performerNameAttrs] = defineField('performer.name')

const lengthDataValues = computed(()=> {
  return !(title.value?.length && description.value?.length && performerEmail.value?.length && performerName?.value.length)
})

const {mutate, isPending} = useMutation({
  'mutationKey': ['create a new task'],
  mutationFn: (data: ITaskFormState) => DB.createDocument(
      config.public.DB_ID,
      config.public.COLLECTION_TASKS,
      uuid(),
      data
  ),
  onSuccess(data, variables, context) {
    toast.add({
      title: 'Success',
      description: 'Task created successfully.',
      color: 'success',
    })
    props.refetch && props.refetch()
    handleReset()
  },
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})
</script>

