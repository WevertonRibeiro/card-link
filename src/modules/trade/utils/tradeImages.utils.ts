import type { Card } from "@/modules/card/types/card.model";

export function getTradeCardImages(cards: Card[]): string[] {
  return cards.map((card) => card.imageUrl);
}
