import { useNormalQueueStore } from "~/store/normal_queue";
import { useVIPQueueStore } from "~/store/vip_queue";
import { Bot, OrderStatusEnum, SortOrderEnum } from "~/types";

export const sortBots = (bots: Bot[], sortOrder: SortOrderEnum) => {
  return bots.sort((a, b) => {
    if (sortOrder === SortOrderEnum.ASC) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
};

export const getCompletedOrders = (bot: Bot) => {
  const nqs = useNormalQueueStore();
  const vqs = useVIPQueueStore();

  const completedOrders = nqs.queue
    .concat(vqs.queue)
    .filter(
      (order) =>
        order.status === OrderStatusEnum.COOKED && order.bot?.id === bot.id
    );

  return completedOrders;
};
