<script lang="ts" setup>
import Header from "./Header.vue";
</script>

<template>
  <div class="default-layout-wrapper">
    <header class="header">
      <Header />
    </header>
    <main class="content">
      <router-view />
    </main>
    <footer class="footer"><h1>footer</h1></footer>
  </div>
</template>

<style lang="scss" scoped>
.default-layout-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  .content {
    flex: 1;
  }
}
</style>
