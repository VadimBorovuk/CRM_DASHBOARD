<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10 flex items-center">
      <SdnButton @click="router.go(-1)" variant="secondary" class="cursor-pointer">
        <Icon name="radix-icons:arrow-left"/>
      </SdnButton>
      <span class="mx-2">Edit</span>
      <span>{{ (data as unknown as IPerformerFormState)?.name }}</span>
    </h1>

    <form @submit="onSubmit" class="max-w-[800px] flex items-start justify-between">
      <div class="flex-1 max-w-[190px] min-w-[190px]">
        <p class="text-md mb-2">Logo</p>
        <SdnSkeleton
            v-if="isLoading"
            class="w-full h-[170px] mb-3"/>
        <div v-else>
          <img
              v-if="values.avatar_url || isPendingUploadImage"
              :src="values.avatar_url" alt=""
              class="my-4 w-full min-h-[170px] max-h-[170px] object-contain"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5 input">
          <SdnInput
              type="file"
              accept="image/*"
              :disabled="isPendingUploadImage"
              @change="(e: InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
          />
        </div>
      </div>
      <div class="ml-10 flex-3">
        <div>
          <p class="pl-3 mb-2">Name</p>
          <SdnInput
              placeholder="Name"
              v-model="name"
              v-bind="nameAttrs"
              type="text"
              class="mb-4"
          />
        </div>

        <div>
          <p class="pl-3 mb-2">Email</p>
          <SdnInput
              placeholder="Email"
              v-model="email"
              v-bind="emailAttrs"
              type="text"
              class="mb-4"
          />
        </div>

        <SdnButton :disabled="isPending" variant="secondary" class="mt-3 cursor-pointer">
          {{ isPending ? 'Loading' : 'Save' }}
        </SdnButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useMutation, useQuery} from "@tanstack/vue-query";
import {v4 as uuid} from "uuid"
import {useRuntimeConfig} from "#app";
import type {IPerformer} from "~/types/tasks.types";
import {useForm} from "vee-validate";

const config = useRuntimeConfig();
const {$appwrite} = useNuxtApp()
const {storage} = $appwrite
const route = useRoute()
const router = useRouter()
const performerId = route.params.id as string

interface IPerformerFormState extends Pick<IPerformer, 'avatar_url' | 'email' | 'name'> {
}

interface InputFileEvent extends Event {
  target: HTMLHtmlElement
}

// const fileInput = ref<HTMLInputElement | null>(null)
const toast = useToast()
const {handleSubmit, defineField, setFieldValue, setValues, values} = useForm<IPerformerFormState>()
const {data, isLoading} = useQuery({
  queryKey: ['get performer', performerId],
  queryFn: () => $appwrite.DB.getDocument(
      config.public.DB_ID,
      config.public.COLLECTION_PERFORMERS,
      performerId
  ),
})

watch(data, (val) => {
  if (val) {
    const initialData = val as unknown as IPerformerFormState
    setValues({
      email: initialData?.email || '',
      avatar_url: initialData?.avatar_url,
      name: initialData?.name
    })
  }
}, {immediate: true})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')

const {mutate, isPending} = useMutation({
  mutationKey: ['update performer', performerId],
  mutationFn: (data: IPerformerFormState) =>
      $appwrite.DB.updateDocument(
          config.public.DB_ID,
          config.public.COLLECTION_PERFORMERS,
          performerId,
          data
      )
})

const onSubmit = handleSubmit(values => {
  mutate(values)
  toast.add({
    title: 'Success',
    description: 'Performer updated successfully',
    color: 'success',
  })
})

// Upload image

const {mutate: uploadImage, isPending: isPendingUploadImage} = useMutation({
  mutationKey: ['update image'],
  mutationFn: (file: File) =>
      storage.createFile(
          config.public.STORAGE_ID,
          uuid(),
          file
      ),
  onSuccess(data) {
    const response = storage.getFileDownload(
        config.public.STORAGE_ID, data.$id
    )
    setFieldValue('avatar_url', response)
    toast.add({
      title: 'Success',
      description: 'File loaded successfully',
      color: 'success',
    })
  },
})

useSeoMeta({
  title: "Edit performer | CRM System"
})
</script>

