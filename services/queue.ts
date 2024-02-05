import { useBotsStore } from '~/store/bots'
import { useNormalQueueStore } from '~/store/normal_queue'
import { useVIPQueueStore } from '~/store/vip_queue'
import {
  Bot,
  BotStatusEnum,
  Order,
  OrderStatusEnum,
  SortOrderEnum
} from '~/types'

export const sortQueue = (
  queue: Order[],
  status: OrderStatusEnum,
  sortOrder: SortOrderEnum
) => {
  return queue
    .filter((order: Order) => order.status === status)
    .sort((a, b) => {
      if (sortOrder === SortOrderEnum.ASC) {
        return a.id - b.id
      } else {
        return b.id - a.id
      }
    })
}

const markOrderAsDone = (order: Order) => {
  order.status = OrderStatusEnum.COOKED

  if (order.bot) {
    order.bot.status = BotStatusEnum.IDLE
    order.bot.order = undefined
  }
}

const assignBots = (orders: Order[], freeBots: Bot[]): Bot[] => {
  const leftOverBots = freeBots

  for (let i = 0; i < orders.length; i++) {
    const order: Order = orders[i]

    if (leftOverBots.length < 1) {
      return []
    }

    const earliestBot = leftOverBots.shift()

    if (!earliestBot) {
      return []
    }

    const cookingTimer: NodeJS.Timeout = setTimeout(() => {
      markOrderAsDone(order)
    }, Number(process.env.TIME_PER_ORDER_MILLISECONDS))
    earliestBot.timer = cookingTimer

    order.status = OrderStatusEnum.COOKING
    order.bot = earliestBot

    earliestBot.status = BotStatusEnum.COOKING
    earliestBot.order = order
  }

  return leftOverBots
}

export const updateCookingStatus = () => {
  const bs = useBotsStore()
  const nq = useNormalQueueStore()
  const vq = useVIPQueueStore()

  const vqPendingOrders = vq.queue.filter(
    (order: Order) => order.status === OrderStatusEnum.PENDING
  )
  const nqPendingOrders = nq.queue.filter(
    (order: Order) => order.status === OrderStatusEnum.PENDING
  )

  if (nqPendingOrders.length < 1 && vqPendingOrders.length < 1) {
    return
  }

  let freeBots = bs.bots.filter((bot: Bot) => bot.status === BotStatusEnum.IDLE)

  if (freeBots.length < 1) {
    return
  }

  if (vq.queueLength > 0) {
    freeBots = assignBots(vqPendingOrders, freeBots)
  }

  if (freeBots.length < 1) {
    return
  }

  if (nq.queueLength > 0) {
    assignBots(nqPendingOrders, freeBots)
  }
}

export const startCooking = (): NodeJS.Timeout => {
  const intervalID = setInterval(
    updateCookingStatus,
    Number(process.env.DASHBOARD_UPDATE_MILLISECONDS)
  )

  return intervalID
}

export const getOrdersCount = (status: OrderStatusEnum) => {
  const nq = useNormalQueueStore()
  const vq = useVIPQueueStore()

  return (
    nq.queue.filter((order: Order) => {
      return order.status === status
    }).length +
    vq.queue.filter((order: Order) => {
      return order.status === status
    }).length
  )
}
