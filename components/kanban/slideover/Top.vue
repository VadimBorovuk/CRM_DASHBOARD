<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">About task</div>

    <KanbanSlideoverLabel label-text="Priority">
      {{slideStore.card?.priority}}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Status">
      <UBadge color="neutral" variant="outline">
        {{slideStore.card?.status}}
      </UBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Performer">
      {{slideStore.card?.performer}}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Description">
      {{slideStore.card?.description}}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Create date">
      {{dayjs(slideStore.card?.$createdAt).format('DD MMMM YYYY')}}
    </KanbanSlideoverLabel>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {useTaskSlideStore} from "~/stores/slide-tasks.store";
const slideStore = useTaskSlideStore()

</script>
