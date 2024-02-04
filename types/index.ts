export enum BotStatusEnum {
  IDLE = "IDLE",
  COOKING = "COOKING",
}

export enum OrderStatusEnum {
  PENDING = "PENDING",
  COOKING = "COOKING",
  COOKED = "COOKED",
}

export enum OrderTypeEnum {
  NORMAL = "NORMAL",
  VIP = "VIP",
}

export enum SortOrderEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export type Bot = {
  id: number;
  status: BotStatusEnum;
  order?: Order;
  timer?: NodeJS.Timeout;
};

export type BotStore = {
  bots: Array<Bot>;
};

export type Order = {
  id: number;
  status: OrderStatusEnum;
  bot?: Bot;
  name: string;
};
