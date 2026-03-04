import type { Card } from "@/modules/card/types/card.model";

export function useTradeImages(cards: Card[]) {
  return cards.map((card) => card.imageUrl);
}
