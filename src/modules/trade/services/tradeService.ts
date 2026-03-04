import { api } from "@/services/api";

import type { TradesResponseDTO } from "../types/trade.dto";
import { mapTradesResponse } from "../mappers/trade.mapper";

export async function getTrades() {
  const response = await api.get<TradesResponseDTO>("/trades?rpp=9&page=1");

  const data = mapTradesResponse(response.data);

  return data;
}
