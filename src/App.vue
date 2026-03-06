<script setup lang="ts">
import { Toaster } from "vue3-hot-toast";
</script>

<template>
  <div>
    <router-view />
  </div>
  <Toaster position="top-right" />
</template>

<style scoped></style>
