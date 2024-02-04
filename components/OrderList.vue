<script setup lang="ts">
import { useNormalQueueStore } from "~/store/normal_queue";
import { useVIPQueueStore } from "~/store/vip_queue";
import { Order, OrderStatusEnum, OrderTypeEnum, SortOrderEnum } from "~/types";
import { sortQueue } from "@/services/queue";
import { reactive } from "vue";

const props = defineProps(["orderType", "sortOrder", "status"]);

const getQueue = () => {
  if (props.orderType === OrderTypeEnum.NORMAL) {
    return useNormalQueueStore();
  } else {
    return useVIPQueueStore();
  }
};
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="q in sortQueue(getQueue().queue, props.status, props.sortOrder)"
      v-bind:key="q.id"
      class="border-slate-600 border-2 rounded my-2"
    >
      <div class="flex p-2">
        {{ q.name }}
      </div>
    </div>
  </div>
</template>
