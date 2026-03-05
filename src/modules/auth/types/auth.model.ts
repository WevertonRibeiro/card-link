import type { Card } from "@/modules/card/types/card.model";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterResponse {
  userId: string;
}

export interface MeResponse {
  id: string;
  name: string;
  email: string;
  cards: Card[];
}
