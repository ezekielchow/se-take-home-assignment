export enum BotStatusEnum {
  IDLE = "IDLE",
  COOKING = "COOKING",
}

export type Bot = {
  id: string;
  status: BotStatusEnum;
};

export type BotStore = {
  bots: Array<Bot>;
};
