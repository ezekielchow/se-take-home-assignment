import { defineStore } from 'pinia'
import { Bot, OrderStatusEnum, OrderTypeEnum } from '~/types'
import { useNormalQueueStore } from './normal_queue'
import { useVIPQueueStore } from './vip_queue'

type State = {
  bots: Bot[]
}

export const useBotsStore = defineStore('bots', {
  state: (): State => {
    return {
      bots: []
    }
  },
  actions: {
    addBot(bot: Bot) {
      this.bots.push(bot)
    },
    removeBot() {
      const deletedBot = this.bots.pop()

      if (deletedBot?.timer) {
        clearTimeout(deletedBot.timer)
      }

      if (deletedBot !== undefined && deletedBot.order !== undefined) {
        if (deletedBot.order.type === OrderTypeEnum.NORMAL) {
          const nqs = useNormalQueueStore()
          nqs.updateStatus(deletedBot.order.id, OrderStatusEnum.PENDING)
        } else {
          const vqs = useVIPQueueStore()
          vqs.updateStatus(deletedBot.order.id, OrderStatusEnum.PENDING)
        }
      }
    }
  },
  getters: {
    botCount(): number {
      return this.bots.length
    }
  }
})
