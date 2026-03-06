import type { CardDTO } from "@/modules/card/types/card.dto";
import type { PaginatedResponseDTO } from "@/types/pagination.dto";

export type TradesResponseDTO = PaginatedResponseDTO<TradeDTO>;

export interface TradeDTO {
  id: string;
  userId: string;
  createdAt: string;
  user: {
    name: string;
  };
  tradeCards: TradeCardDTO[];
}

export type TradeCardTypeDTO = "OFFERING" | "RECEIVING";

export interface TradeCardDTO {
  id: string;
  cardId: string;
  tradeId: string;
  type: TradeCardTypeDTO;
  card: CardDTO;
}

export interface TradeCardRequestDTO {
  cardId: string;
  type: TradeCardTypeDTO;
}

export interface TradeRequestDTO {
  cards: TradeCardRequestDTO[];
}
