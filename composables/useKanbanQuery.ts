import {useQuery} from "@tanstack/vue-query";
import {useRuntimeConfig} from "#app";
import {KANBAN_DATA} from "~/components/kanban/kanban.data";
import type {ITask} from "~/types/tasks.types";
import type {IColumn} from "~/components/kanban/kanban.types";

export const useKanbanQuery = () => {
  const {$appwrite} = useNuxtApp()
  const config = useRuntimeConfig()

  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => $appwrite.DB.listDocuments(
        config.public.DB_ID,
        config.public.COLLECTION_TASKS
    ),
    select(data) {
      const newBoard: IColumn[] = KANBAN_DATA.map(column =>({
        ...column,
        items: []
      }));
      const tasks = data.documents as unknown as ITask[]

      for (const task of tasks) {
        const column = newBoard.find(col => col.id === task.status)
        if (column){
          column.items.push({
            $createdAt: task.$createdAt,
            id: task.$id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            performer: task.performer.name
          })
        }
      }
      return newBoard
    },
  })
}
