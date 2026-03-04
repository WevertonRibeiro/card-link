import { useQuery } from "@tanstack/vue-query";
import { getFeaturedCards } from "../services/cardService";

export function useCardsQuery() {
  return useQuery({
    queryKey: ["cards"],
    queryFn: getFeaturedCards,
    staleTime: 1000 * 60 * 5,
  });
}
