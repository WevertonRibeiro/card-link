import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
import {
  getFeaturedCards,
  getMeCards,
  postMeCards,
  getCards,
} from "../services/cardService";
import { toast } from "vue3-hot-toast";

export function useFeaturedCardsQuery() {
  return useQuery({
    queryKey: ["featuredCards"],
    queryFn: getFeaturedCards,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCardsQuery(rpp: number = 100, page: number = 1) {
  return useQuery({
    queryKey: ["cards", rpp, page],
    queryFn: () => getCards(rpp, page),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMeCardsQuery() {
  return useQuery({
    queryKey: ["meCards"],
    queryFn: getMeCards,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePostMeCardsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMeCards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meCards"] });
      toast.success("Carta adicionada com sucesso!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
}
