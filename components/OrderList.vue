<script setup lang="ts">
import { sortQueue } from '~/services/queue';
import { useNormalQueueStore } from '~/store/normal_queue';
import { useVIPQueueStore } from '~/store/vip_queue';
import { OrderStatusEnum, OrderTypeEnum } from '~/types';

const props = defineProps(['orderType', 'sortOrder', 'status'])

const getQueue = () => {
  if (props.orderType === OrderTypeEnum.NORMAL) {
    return useNormalQueueStore()
  } else {
    return useVIPQueueStore()
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="order in sortQueue(getQueue().queue, props.status, props.sortOrder)"
      :key="order.id"
      class="border-slate-600 border-2 rounded my-2"
    >
      <div class="flex flex-col p-2">
        <div class="font-bold">
          {{ order.name }}
        </div>
        <div v-if="order.bot !== undefined">
          {{ `By Chef: ${String(order.bot.id).padStart(3, "0")}` }}
        </div>
        <progress v-if="order.status === OrderStatusEnum.COOKING" max="10" :value="order.timer" />
      </div>
    </div>
  </div>
</template>
