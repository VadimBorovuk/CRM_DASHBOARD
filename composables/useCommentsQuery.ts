import {useQuery} from "@tanstack/vue-query";
import {useRuntimeConfig} from "#app";

export const useCommentsQuery = () => {
  const config = useRuntimeConfig()
  const {$appwrite} = useNuxtApp()

  const storeTask = useTaskSlideStore()
  const cardId = storeTask.card?.id || '';

  return useQuery({
    queryKey: ['task', cardId],

    queryFn: async () => {
      const doc = await $appwrite.DB.getDocument(
          config.public.DB_ID,
          config.public.COLLECTION_TASKS,
          cardId
      )
      // Сортуємо коментарі за спаданням (новіші першими)
      if (Array.isArray(doc.comments)) {
        doc.comments.sort((a, b) => b.$createdAt.localeCompare(a.$createdAt))
      }
      return doc
    }

  })
}
