<script setup lang="ts">
import { defineComponent } from "vue";
import { addBot, useBots } from "@/store/bots";
import { Bot, BotStatusEnum } from "@/types/bot";

const bots = useBots();

const add = () => {
  const newBot: Bot = { id: crypto.randomUUID(), status: BotStatusEnum.IDLE };
  addBot(newBot);
};
</script>

<template>
  <div class="flex flex-col border-solid border-2 border-slate-600 my-2 p-5">
    <span class="mb-2">Bots ({{ bots.length }})</span>
    <Button @click.prevent="add()" class="m-2">+ Bot</Button>
    <Button @click.prevent="" class="m-2">- Bot</Button>
  </div>
</template>
