import type { CardDTO } from "../types/card.dto";
import type { Card } from "../types/card.model";

export function mapCard(card: CardDTO): Card {
  return {
    id: card.id,
    name: card.name,
    description: card.description,
    imageUrl: card.imageUrl,
    createdAt: new Date(card.createdAt),
  };
}
