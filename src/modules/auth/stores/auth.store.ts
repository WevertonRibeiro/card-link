import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token") || null);

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  }

  function clearSession() {
    token.value = null;
    localStorage.removeItem("token");
  }

  const isAuthenticated = computed(() => !!token.value);

  return {
    token,
    isAuthenticated,
    setToken,
    clearSession,
  };
});
