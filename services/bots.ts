import { Bot, SortOrderEnum } from "~/types";

export const sortBots = (bots: Bot[], sortOrder: SortOrderEnum) => {
  return bots.sort((a, b) => {
    if (sortOrder === SortOrderEnum.ASC) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
};
