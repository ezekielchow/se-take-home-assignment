import { defineStore } from "pinia";
import { updateCookingStatus } from "~/services/queue";

type State = {
  operation: NodeJS.Timeout | undefined;
};

export const useOperationStore = defineStore("operation", {
  state: (): State => {
    return {
      operation: undefined,
    };
  },
  actions: {
    startOperation() {
      this.operation = setInterval(updateCookingStatus, 1000);
    },
    stopOperation() {
      this.operation && clearInterval(this.operation);
      this.operation = undefined;
    },
  },
});
