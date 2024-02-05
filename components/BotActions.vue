<script setup lang="ts">
import { useBotsStore } from '~/store/bots';
import { Bot, BotStatusEnum } from '~/types';

const botStore = useBotsStore()

const add = () => {
  const newBot: Bot = {
    id: Number(botStore.botCount + 1),
    status: BotStatusEnum.IDLE
  }
  botStore.addBot(newBot)
}
</script>

<template>
  <span class="mb-2">Bots (Active: {{ botStore.botCount }})</span>
  <Button class="m-2" @click.prevent="add()">
    + Bot
  </Button>
  <Button class="m-2" @click.prevent="botStore.removeBot">
    - Bot
  </Button>
</template>
