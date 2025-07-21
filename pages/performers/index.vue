<template>
  <div class="p-10">
    <h1>Performers</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <SdnTable>
        <SdnTableHeader>
          <SdnTableRow>
            <SdnTableHead class="w-100px">image</SdnTableHead>
            <SdnTableHead class="w-100px">name</SdnTableHead>
            <SdnTableHead class="w-100px">email</SdnTableHead>
          </SdnTableRow>
        </SdnTableHeader>

        <SdnTableBody>
          <SdnTableRow
              v-for="performer in data?.documents"
              :key="performer.$id"
          >
            <SdnTableCell>
<!--              :to="`/performers/edit/${performer.$id}`"-->
              <NuxtLink :to="`/performers`">
                <img :src="performer.avatar_url" alt="" width="50" height="50">
              </NuxtLink>
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
  title: 'Performers'
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
