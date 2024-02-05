<script setup lang="ts">
import { useNormalQueueStore } from '~/store/normal_queue';
import { useVIPQueueStore } from '~/store/vip_queue';
import {
Order,
OrderStatusEnum,
OrderTypeEnum
} from '~/types';

const nqs = useNormalQueueStore()
const vqs = useVIPQueueStore()

const newOrder = (type: OrderTypeEnum) => {
  const newOrder: Order = {
    id: 0,
    status: OrderStatusEnum.PENDING,
    name: '',
    type
  }

  if (type === OrderTypeEnum.NORMAL) {
    newOrder.id = nqs.queueLength + 1
    newOrder.name = `Normal Order ${newOrder.id}`
    nqs.addOrder(newOrder)
  } else {
    newOrder.id = vqs.queueLength + 1
    newOrder.name = `VIP Order ${newOrder.id}`
    vqs.addOrder(newOrder)
  }
}
</script>

<template>
  <span class="mb-2">Orders</span>
  <Button
    class="m-2"
    @click.prevent="newOrder(OrderTypeEnum.NORMAL)"
  >
    New Normal Order
  </Button>
  <Button
    class="m-2"
    @click.prevent="newOrder(OrderTypeEnum.VIP)"
  >
    New VIP Order
  </Button>
</template>
