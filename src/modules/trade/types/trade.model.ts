import type { Card } from "@/modules/card/types/card.model";

export interface TradesResponse {
  trades: Trade[];
  rpp: number;
  page: number;
  hasMore: boolean;
}

export interface Trade {
  id: string;
  userId: string;
  userName: string;
  createdAt: Date;
  offeringCards: Card[];
  receivingCards: Card[];
}
