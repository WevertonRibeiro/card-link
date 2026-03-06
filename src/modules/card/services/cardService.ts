import { api } from "@/services/api";

import type {
  CardsResponseDTO,
  CardDTO,
  PostMeCardRequestDTO,
} from "../types/card.dto";
import type { Card } from "../types/card.model";

import { mapCard } from "../mappers/card.mapper";

export async function getFeaturedCards(): Promise<Card[]> {
  const response = await api.get<CardsResponseDTO>("/cards?rpp=5&page=1");
  return response.data.list.map(mapCard);
}

export async function getCards(rpp: number, page: number): Promise<Card[]> {
  const response = await api.get<CardsResponseDTO>(
    `/cards?rpp=${rpp}&page=${page}`,
  );
  return response.data.list.map(mapCard);
}

export async function getMeCards(): Promise<Card[]> {
  const response = await api.get<CardDTO[]>("/me/cards");

  return response.data.map(mapCard);
}

export async function postMeCards(cardIds: PostMeCardRequestDTO) {
  const response = await api.post("/me/cards", cardIds);
  console.log(response.data);
}
