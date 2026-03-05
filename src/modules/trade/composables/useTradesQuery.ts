import { useQuery } from "@tanstack/vue-query";
import { getTrades } from "../services/trade.service";

export function useTradesQuery() {
  return useQuery({
    queryKey: ["trades"],
    queryFn: getTrades,
    staleTime: 1000 * 60 * 5,
  });
}
