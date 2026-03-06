import type { TradesResponseDTO, TradeDTO } from "../types/trade.dto";
import type { TradesResponse, Trade } from "../types/trade.model";

import type { Card } from "@/modules/card/types/card.model";
import { mapCard } from "@/modules/card/mappers/card.mapper";

export function mapTradePostResponse(dto: { tradeId: string }): {
  tradeId: string;
} {
  return {
    tradeId: dto.tradeId,
  };
}

export function mapTradesResponse(dto: TradesResponseDTO): TradesResponse {
  return {
    trades: dto.list.map(mapTrade),
    rpp: dto.rpp,
    page: dto.page,
    hasMore: dto.more,
  };
}

function mapTrade(dto: TradeDTO): Trade {
  const offeringCards: Card[] = [];
  const receivingCards: Card[] = [];

  dto.tradeCards.forEach((tc) => {
    const mappedCard = mapCard(tc.card);

    if (tc.type === "OFFERING") {
      offeringCards.push(mappedCard);
    } else {
      receivingCards.push(mappedCard);
    }
  });

  return {
    id: dto.id,
    userId: dto.userId,
    userName: dto.user.name,
    createdAt: new Date(dto.createdAt),
    offeringCards,
    receivingCards,
  };
}
