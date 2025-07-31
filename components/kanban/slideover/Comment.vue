<template>
  <div class="p-6 pt-0 min-h-[350px] overflow-y-auto relative">
    <div class="sticky top-0 z-50 py-5 bg-sidebar">
      <UInput
          class="w-full"
          v-model.trim="commentRef"
          placeholder="enter comment"
          @keyup.enter="writeComment"
      />
    </div>

    <div class="">
      <SdnSkeleton
          v-if="isLoading"
          class="w-full h-[76px] rounded mt-5"/>
      <div v-else-if="card">
        <div
            v-for="comment in card?.comments"
            :key="comment.$id"
            class="flex items-start mt-5"
        >
<!--          <Icon name="radix-icons:chat-bubble z-10" class="mr-3 mt-1" size="25"/>-->
          <div>
            <div class="mb-2 text-sm">
              Comment: {{ dayjs(comment.$createdAt).format('DD MMMM HH:mm') }}
            </div>
            <UBadge color="neutral" variant="outline">
              {{ comment.text }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type {ITask} from "~/types/tasks.types";

const {data, refetch, isLoading} = useCommentsQuery()
const {commentRef, writeComment} = useCreateComment({refetch})

const card = data as unknown as ITask

</script>

<style scoped>

</style>
