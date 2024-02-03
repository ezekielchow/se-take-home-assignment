import { expect, it } from "vitest";
import { addBot, useBots } from "~/store/bots";
import { Bot, BotStatusEnum } from "~/types/bot";

it("should add bot to when add bots clicked", () => {
  const bots = useBots();
  expect(bots.value.length).toBe(0);

  const botsToAdd: Array<Bot> = [
    {
      id: crypto.randomUUID(),
      status: BotStatusEnum.IDLE,
    },
    {
      id: crypto.randomUUID(),
      status: BotStatusEnum.IDLE,
    },
  ];

  for (let i = 0; i < botsToAdd.length; i++) {
    const newBot = botsToAdd[i];

    addBot(newBot);
    expect(bots.value.length).toBe(i + 1);
  }
});
