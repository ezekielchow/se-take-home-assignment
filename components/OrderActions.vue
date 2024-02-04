<script setup lang="ts">
import { defineComponent } from "vue";
import {
  Bot,
  BotStatusEnum,
  Order,
  OrderStatusEnum,
  OrderTypeEnum,
} from "~/types";
import { useNormalQueueStore } from "~/store/normal_queue";
import { useVIPQueueStore } from "~/store/vip_queue";

const nqs = useNormalQueueStore();
const vqs = useVIPQueueStore();

const newOrder = (type: OrderTypeEnum) => {
  const newOrder: Order = {
    id: 0,
    status: OrderStatusEnum.PENDING,
    name: "",
    type: type,
  };

  if (type === OrderTypeEnum.NORMAL) {
    newOrder.id = nqs.queueLength + 1;
    newOrder.name = `Normal Order ${newOrder.id}`;
    nqs.addOrder(newOrder);
  } else {
    newOrder.id = vqs.queueLength + 1;
    newOrder.name = `VIP Order ${newOrder.id}`;
    vqs.addOrder(newOrder);
  }
};
</script>

<template>
  <span class="mb-2">Orders</span>
  <Button @click.prevent="newOrder(OrderTypeEnum.NORMAL)" class="m-2"
    >New Normal Order</Button
  >
  <Button @click.prevent="newOrder(OrderTypeEnum.VIP)" class="m-2"
    >New VIP Order</Button
  >
</template>
