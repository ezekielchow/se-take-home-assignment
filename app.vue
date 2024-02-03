<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div>
    <div class="container mx-auto">
      <h1>Welcome To McDonals</h1>
      <h2>Track your order here</h2>
      <div class="flex flex-col">
        <div class="flex">
          <bot-actions />
          <div
            class="flex flex-col border-solid border-2 border-slate-600 my-2 mx-2 p-5"
          >
            <span class="mb-2">Orders</span>
            <Button @click.prevent="" class="m-2">New Order</Button>
            <Button @click.prevent="" class="m-2">New VIP Order</Button>
          </div>
        </div>
        <div class="flex border-solid border-2 border-slate-600 mt-2 p-2">
          <span>Queues</span>
          <div class="flex"></div>
        </div>
      </div>
    </div>
  </div>
</template>
