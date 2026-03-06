import { api } from "@/services/api";

import type { TradesResponseDTO, TradeRequestDTO } from "../types/trade.dto";
import type { TradesResponse } from "../types/trade.model";
import {
  mapTradesResponse,
  mapTradePostResponse,
} from "../mappers/trade.mapper";

export async function getTrades(): Promise<TradesResponse> {
  const response = await api.get<TradesResponseDTO>("/trades?rpp=9&page=1");
  return mapTradesResponse(response.data);
}

export async function postTrade(
  cards: TradeRequestDTO,
): Promise<{ tradeId: string }> {
  const response = await api.post<{ tradeId: string }>("/trades", cards);
  return mapTradePostResponse(response.data);
}

export async function deleteTrade(id: string) {
  await api.delete(`/trades/${id}`);
}
