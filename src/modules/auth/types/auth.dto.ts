import type { CardDTO } from "@/modules/card/types/card.dto";

export interface MeResponseDTO {
  id: string;
  name: string;
  email: string;
  cards: CardDTO[];
}

export interface LoginResponseDTO {
  token: string;
  user: UserDTO;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  userId: string;
}
