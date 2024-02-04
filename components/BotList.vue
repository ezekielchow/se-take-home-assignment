<script setup lang="ts">
import { useNormalQueueStore } from "~/store/normal_queue";
import { useVIPQueueStore } from "~/store/vip_queue";
import { Order, OrderStatusEnum, OrderTypeEnum, SortOrderEnum } from "~/types";
import { sortBots } from "@/services/bots";
import { reactive } from "vue";
import { useBotsStore } from "~/store/bots";

const bots = useBotsStore();
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="b in sortBots(bots.bots, SortOrderEnum.ASC)"
      v-bind:key="b.id"
      class="border-slate-600 border-2 rounded my-2"
    >
      <div class="flex flex-col p-2">
        <div class="font-bold">
          {{ `Chef ${String(b.id).padStart(3, "0")}` }}
        </div>
        <div>{{ `Status: ${b.status}` }}</div>
      </div>
    </div>
  </div>
</template>
