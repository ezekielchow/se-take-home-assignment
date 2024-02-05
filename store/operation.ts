import { defineStore } from 'pinia'
import { DASHBOARD_UPDATE_MILLISECONDS } from '~/config/config'
import { updateCookingStatus } from '~/services/queue'

type State = {
  operation: NodeJS.Timeout | undefined
}

export const useOperationStore = defineStore('operation', {
  state: (): State => {
    return {
      operation: undefined
    }
  },
  actions: {
    startOperation() {
      this.operation = setInterval(
        updateCookingStatus,
        DASHBOARD_UPDATE_MILLISECONDS
      )
    },
    stopOperation() {
      this.operation && clearInterval(this.operation)
      this.operation = undefined
    }
  }
})
