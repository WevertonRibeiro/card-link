import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
import { getTrades, postTrade, deleteTrade } from "../services/trade.service";
import { toast } from "vue3-hot-toast";

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
    mutationFn: (cards: TradeRequestDTO) => postTrade(cards),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      toast.success("Troca enviada com sucesso!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
}

export function useDeleteTradeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      toast.success("Troca cancelada com sucesso!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
}
