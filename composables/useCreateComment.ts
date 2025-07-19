import {useMutation} from "@tanstack/vue-query";
import {useRuntimeConfig} from "#app";
import {v4 as uuid} from 'uuid'


export function useCreateComment({refetch}: { refetch: () => void }) {
  const config = useRuntimeConfig()
  const {$appwrite} = useNuxtApp()

  const storeTask = useTaskSlideStore()
  const commentRef = ref<String>('')

  const {mutate} = useMutation({
    mutationKey: ['add comments', commentRef.value],
    mutationFn: () => $appwrite.DB.createDocument(
        config.public.DB_ID,
        config.public.COLLECTION_COMMENTS,
        uuid(),
        {
          text: commentRef.value,
          tasks: storeTask.card?.id
        }),
    onSuccess(data, variables, context) {
      refetch()
      commentRef.value = ''
    },
  })

  const writeComment = () =>{
    if (!commentRef.value) return
    mutate()
  }

  return {
    writeComment,
    commentRef
  }
}


