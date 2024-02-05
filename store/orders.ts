import { BotStatusEnum, Order, OrderStatusEnum } from '../types'

export const markOrderAsDone = (order: Order) => {
  order.status = OrderStatusEnum.COOKED

  if (order.bot) {
    order.bot.status = BotStatusEnum.IDLE
    order.bot.order = undefined
  }
}
