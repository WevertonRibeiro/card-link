import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routes";

import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

import "@/styles/globals.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const app = createApp(App);

app.use(router);

app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
