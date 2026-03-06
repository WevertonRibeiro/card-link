import { ref, onMounted } from "vue";

type Theme = "light" | "dark";

const theme = ref<Theme>("light");

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function applyTheme(newTheme: Theme) {
  const root = document.documentElement;

  root.removeAttribute("data-theme");
  root.setAttribute("data-theme", newTheme);

  theme.value = newTheme;
  localStorage.setItem("theme", newTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (isTheme(savedTheme)) {
    applyTheme(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

export function useTheme() {
  onMounted(() => {
    initTheme();
  });

  const toggleTheme = () => {
    const newTheme: Theme = theme.value === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
}
