import { Bot } from "~/types/bot";

export const useBots = () => useState<Array<Bot>>("bots", () => []);

export const addBot = (bot: Bot) => {
  const bots = useBots();
  bots.value = [...bots.value, bot];
};
