import type {
  LoginResponseDTO,
  RegisterResponseDTO,
  MeResponseDTO,
} from "../types/auth.dto";
import type {
  LoginResponse,
  RegisterResponse,
  MeResponse,
} from "../types/auth.model";

import { mapCard } from "@/modules/card/mappers/card.mapper";

export function mapMeResponse(dto: MeResponseDTO): MeResponse {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    cards: dto.cards.map(mapCard),
  };
}

export function mapLoginResponse(dto: LoginResponseDTO): LoginResponse {
  return {
    token: dto.token,
    user: {
      id: dto.user.id,
      name: dto.user.name,
      email: dto.user.email,
    },
  };
}

export function mapRegisterResponse(
  dto: RegisterResponseDTO,
): RegisterResponse {
  return {
    userId: dto.userId,
  };
}
