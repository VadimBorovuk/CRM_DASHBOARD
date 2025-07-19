<template>
  <UInput
      v-model.trim="commentRef"
      placeholder="enter comment"
      @keyup.enter="writeComment"
  />
  <SdnSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5"/>
  <div v-else-if="card">
    <div
        v-for="comment in card?.comments"
        :key="comment.$id"
        class="flex items-start mt-5"
    >
      <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="25"/>
      <div>
        <div class="mb-2 text-sm">
          Comment: {{ dayjs(comment.$createdAt).format('HH:mm') }}
        </div>
        <p>{{ comment.text }}</p>
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
