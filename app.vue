<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { OrderTypeEnum } from "~/types";
import { startCooking, updateCookingStatus } from "./services/queue";

startCooking();
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
            <bot-actions />
          </div>
          <div
            class="flex flex-col border-solid border-2 border-slate-600 my-2 mx-2 p-5"
          >
            <order-actions />
          </div>
        </div>
        <div
          class="flex-col border-solid border-2 border-slate-600 mt-2 p-2 min-h-screen"
        >
          <div class="my-5 ml-2">Queues</div>
          <div class="flex">
            <div
              class="flex flex-col items-center border-solid border-2 border-slate-600 mx-2 p-2"
            >
              <h3>Pending Orders</h3>
              <order-list
                :orderType="OrderTypeEnum.VIP"
                sortOrder="ASC"
                status="PENDING"
              />
              <order-list
                :orderType="OrderTypeEnum.NORMAL"
                sortOrder="ASC"
                status="PENDING"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
