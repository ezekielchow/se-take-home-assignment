<script setup lang="ts">
import { OrderStatusEnum, OrderTypeEnum, SortOrderEnum } from '~/types';
import { getOrdersCount } from './services/queue';
</script>

<template>
  <div>
    <div class="container mx-auto">
      <h1>Welcome To McDonals</h1>
      <h2>Track your order here</h2>
      <div class="flex flex-col">
        <div class="flex">
          <div
            class="flex flex-col border-solid border-2 border-slate-600 my-2 p-5"
          >
            <cooking-actions />
          </div>
          <div
            class="flex flex-col border-solid border-2 border-slate-600 my-2 p-5"
          >
            <bot-actions />
          </div>
          <div
            class="flex flex-col border-solid border-2 border-slate-600 my-2 mx-2 p-5"
          >
            <order-actions />
          </div>
        </div>
        <div class="flex">
          <div
            class="flex flex-col items-center border-solid border-2 border-slate-600 my-2 p-2 min-w-52"
          >
            <div class="my-5 ml-2">
              Bot Chefs
            </div>
            <bot-list />
          </div>
          <div
            class="flex-col border-solid border-2 border-slate-600 mt-2 p-2 min-h-screen"
          >
            <div class="my-5 ml-2">
              Queues
            </div>
            <div class="flex">
              <div
                class="flex flex-col items-center border-solid border-2 border-slate-600 mx-2 p-2 min-w-52"
              >
                <h3>Pending ({{ getOrdersCount(OrderStatusEnum.PENDING) }})</h3>
                <order-list
                  :order-type="OrderTypeEnum.VIP"
                  :sort-order="SortOrderEnum.ASC"
                  :status="OrderStatusEnum.PENDING"
                />
                <order-list
                  :order-type="OrderTypeEnum.NORMAL"
                  :sort-order="SortOrderEnum.ASC"
                  :status="OrderStatusEnum.PENDING"
                />
              </div>
              <div
                class="flex flex-col items-center border-solid border-2 border-slate-600 mx-2 p-2 min-w-52"
              >
                <h3>Cooking ({{ getOrdersCount(OrderStatusEnum.COOKING) }})</h3>
                <order-list
                  :order-type="OrderTypeEnum.VIP"
                  :sort-order="SortOrderEnum.ASC"
                  :status="OrderStatusEnum.COOKING"
                />
                <order-list
                  :order-type="OrderTypeEnum.NORMAL"
                  :sort-order="SortOrderEnum.ASC"
                  :status="OrderStatusEnum.COOKING"
                />
              </div>
              <div
                class="flex flex-col items-center border-solid border-2 border-slate-600 mx-2 p-2 min-w-52"
              >
                <h3>Done ({{ getOrdersCount(OrderStatusEnum.COOKED) }})</h3>
                <order-list
                  :order-type="OrderTypeEnum.VIP"
                  :sort-order="SortOrderEnum.DESC"
                  :status="OrderStatusEnum.COOKED"
                />
                <order-list
                  :order-type="OrderTypeEnum.NORMAL"
                  :sort-order="SortOrderEnum.DESC"
                  :status="OrderStatusEnum.COOKED"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
