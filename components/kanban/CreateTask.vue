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
      class="form"
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
    <SdnInput
        v-model="performerEmail"
        v-bind="performerEmailAttrs"
        placeholder="Enter performer email"
        type="text" class="input mb-2"
    />
    <SdnInput
        v-model="performerName"
        v-bind="performerNameAttrs"
        placeholder="Enter performer name"
        type="text" class="input mb-2"
    />
    <button
        class="btn p-2 border border-b-amber-400 cursor-pointer"
        :disabled="isPending"
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

const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  refetch: {
    type: Function
  }
})

const isOpenForm = ref(false)
const {$appwrite} = useNuxtApp()
const {DB} = $appwrite
const config = useRuntimeConfig();

interface ITaskFormState extends Pick<ITask, 'title' | 'description'> {
  performer: {
    email: string
    name: string
  }
  status: string
}

const {handleSubmit, defineField, handleReset} = useForm<ITaskFormState>({
  initialValues: {
    status: props.status
  }
})

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [performerEmail, performerEmailAttrs] = defineField('performer.email')
const [performerName, performerNameAttrs] = defineField('performer.name')


const {mutate, isPending} = useMutation({
  'mutationKey': ['create a new task'],
  mutationFn: (data: ITaskFormState) => DB.createDocument(
      config.public.DB_ID,
      config.public.COLLECTION_TASKS,
      uuid(),
      data
  ),
  onSuccess(data, variables, context) {
    props.refetch && props.refetch()
    handleReset()
  },
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})
</script>

