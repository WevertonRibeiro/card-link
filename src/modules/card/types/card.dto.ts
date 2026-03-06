import type { PaginatedResponseDTO } from "@/types/pagination.dto";

export type CardsResponseDTO = PaginatedResponseDTO<CardDTO>;

export interface CardDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface PostMeCardRequestDTO {
  cardIds: string[];
}
