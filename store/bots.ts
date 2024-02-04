import { defineStore } from "pinia";
import { Bot, OrderStatusEnum } from "~/types";
import { useNormalQueueStore } from "./normal_queue";
import { useVIPQueueStore } from "./vip_queue";

type State = {
  bots: Bot[];
};

export const useBotsStore = defineStore("bots", {
  state: (): State => {
    return {
      bots: [],
    };
  },
  actions: {
    addBot(bot: Bot) {
      this.bots.push(bot);
    },
    removeBot() {
      const deletedBot = this.bots.pop();

      const nqs = useNormalQueueStore();
      const vqs = useVIPQueueStore();

      if (deletedBot !== undefined && deletedBot.order !== undefined) {
        nqs.updateStatus(deletedBot.order.id, OrderStatusEnum.PENDING);
        vqs.updateStatus(deletedBot.order.id, OrderStatusEnum.PENDING);
      }
    },
  },
  getters: {
    botCount(): number {
      return this.bots.length;
    },
  },
});
