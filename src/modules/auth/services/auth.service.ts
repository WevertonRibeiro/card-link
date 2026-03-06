import { api } from "@/services/api";

import type {
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  LoginRequestDTO,
  MeResponseDTO,
} from "../types/auth.dto";
import type {
  LoginResponse,
  RegisterResponse,
  MeResponse,
} from "../types/auth.model";

import {
  mapLoginResponse,
  mapRegisterResponse,
  mapMeResponse,
} from "../mappers/auth.mapper";

export async function getMe(): Promise<MeResponse> {
  const response = await api.get<MeResponseDTO>("/me");
  return mapMeResponse(response.data);
}

export async function postLogin({
  email,
  password,
}: LoginRequestDTO): Promise<LoginResponse> {
  const response = await api.post<LoginResponseDTO>("/login", {
    email,
    password,
  });

  return mapLoginResponse(response.data);
}

export async function PostRegister({
  name,
  email,
  password,
}: RegisterRequestDTO): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponseDTO>("/register", {
    name,
    email,
    password,
  });

  return mapRegisterResponse(response.data);
}
