<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Performers | Crm System
    </h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <SdnTable>
        <SdnTableHeader>
          <SdnTableRow>
            <SdnTableHead class="w-100px">Avatar</SdnTableHead>
            <SdnTableHead class="w-100px">ID</SdnTableHead>
            <SdnTableHead class="w-100px">Name</SdnTableHead>
            <SdnTableHead class="w-100px">Email</SdnTableHead>
          </SdnTableRow>
        </SdnTableHeader>

        <SdnTableBody>
          <SdnTableRow
              v-for="performer in data?.documents"
              :key="performer.$id"
          >
            <SdnTableCell width="80">
              <NuxtLink :to="`/performers/edit/${performer.$id}`">
                <img :src="performer.avatar_url" alt="" width="50" height="50">
              </NuxtLink>
            </SdnTableCell>
            <SdnTableCell width="400">
              {{performer.$id}}
            </SdnTableCell>
            <SdnTableCell>
              {{performer.name}}
            </SdnTableCell>
            <SdnTableCell>
              {{performer.email}}
            </SdnTableCell>
          </SdnTableRow>
        </SdnTableBody>
      </SdnTable>

    </div>
  </div>
</template>

<script setup>
import {useQuery} from "@tanstack/vue-query";

const config = useRuntimeConfig();
const { $appwrite } = useNuxtApp()
import {useRuntimeConfig} from "#app";

useSeoMeta({
  title: "Performers | CRM System"
})

const {data, isLoading} = useQuery({
  queryKey: ['performers'],
  queryFn: () => $appwrite.DB.listDocuments(
      config.public.DB_ID,
      config.public.COLLECTION_PERFORMERS
  )
})
// const performers = (data?.value?.documents as unknown as IPerformer[])

</script>

<style lang="scss" scoped>

</style>
