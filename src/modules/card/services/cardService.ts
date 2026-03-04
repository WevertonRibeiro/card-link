import { api } from "@/services/api";

import type { CardsResponseDTO } from "../types/card.dto";
import type { Card } from "../types/card.model";

import { mapCard } from "../mappers/card.mapper";

export const getFeaturedCards = async (): Promise<Card[]> => {
  const response = await api.get<CardsResponseDTO>("/cards?rpp=5&page=1");
  return response.data.list.map(mapCard);
};
