<script setup lang="ts">
import { getCompletedOrders, sortBots } from '~/services/bots'
import { useBotsStore } from '~/store/bots'
import { SortOrderEnum } from '~/types'

const bots = useBotsStore()
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="b in sortBots(bots.bots, SortOrderEnum.ASC)"
      :key="b.id"
      class="border-slate-600 border-2 rounded my-2"
    >
      <div class="flex flex-col p-2">
        <div class="font-bold">
          {{ `Chef ${String(b.id).padStart(3, "0")}` }}
        </div>
        <div>{{ `Status: ${b.status}` }}</div>
        <div>{{ `Completed Orders: ${getCompletedOrders(b).length}` }}</div>
      </div>
    </div>
  </div>
</template>
