<script setup lang="ts">
import { defineComponent } from "vue";
import { useBotsStore } from "@/store/bots";
import { Bot, BotStatusEnum } from "~/types";

const botStore = useBotsStore();

const add = () => {
  const newBot: Bot = {
    id: Number(botStore.botCount + 1),
    status: BotStatusEnum.IDLE,
  };
  botStore.addBot(newBot);
};
</script>

<template>
  <span class="mb-2">Active Bots ({{ botStore.botCount }})</span>
  <Button @click.prevent="add()" class="m-2">+ Bot</Button>
  <Button @click.prevent="botStore.removeBot" class="m-2">- Bot</Button>
</template>
