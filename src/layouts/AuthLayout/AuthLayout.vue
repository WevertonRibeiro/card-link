<script lang="ts" setup>
import { useTheme } from "@/composables/useTheme";

const { theme } = useTheme();
</script>
<template>
  <main class="auth-layout" :class="theme">
    <router-view />
  </main>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
}
</style>
