import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
import { getTrades, PostTrade } from "../services/trade.service";
import type { TradeRequestDTO } from "../types/trade.dto";

export function useTradesQuery() {
  return useQuery({
    queryKey: ["trades"],
    queryFn: getTrades,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateTradeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cards: TradeRequestDTO) => PostTrade(cards),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
    },
  });
}
