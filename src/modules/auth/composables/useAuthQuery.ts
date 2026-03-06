import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
import { getMe, postLogin, PostRegister } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";
import { useRouter } from "vue-router";
import { toast } from "vue3-hot-toast";

export function useMeQuery() {
  const auth = useAuthStore();
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: auth.isAuthenticated,
  });
}

export function useLoginMutation() {
  const auth = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      auth.setToken(data.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
}

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: PostRegister,
    onSuccess: () => {
      router.push("/auth/login");
      toast.success("Usuário criado com sucesso!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
}
