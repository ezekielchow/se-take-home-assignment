import { defineStore } from "pinia";
import { Order, OrderStatusEnum } from "~/types";

type State = {
  queue: Order[];
};

export const useVIPQueueStore = defineStore("vip-queue", {
  state: (): State => {
    return {
      queue: [],
    };
  },
  actions: {
    addOrder(order: Order) {
      this.queue.push(order);
    },
    updateStatus(id: number, status: OrderStatusEnum) {
      const index = this.queue.findIndex((order) => order.id === id);
      if (index !== -1) {
        this.queue[index].status = status;
        this.queue[index].bot = undefined;
      }
    },
  },
  getters: {
    queueLength(): number {
      return this.queue.length;
    },
  },
});
