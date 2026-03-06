import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token") || null);
  const router = useRouter();

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  }

  function clearSession(redirectToLogin: boolean = true) {
    token.value = null;
    localStorage.removeItem("token");
    if (redirectToLogin) router.push('/auth/login');
  }

  const isAuthenticated = computed(() => !!token.value);

  return {
    token,
    isAuthenticated,
    setToken,
    clearSession,
  };
});
