<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "@/composables/useTheme";
import Container from "@/components/layout/Container.vue";
import SearchInput from "@/components/ui/SearchInput.vue";

const searchValue = ref("");
const { theme, toggleTheme } = useTheme();

const onSearch = (value: string) => {
  console.log(value);
};
</script>
<template>
  <div class="header">
    <Container class="header-container">
      <img src="../../assets/images/logo-cardlink.svg" alt="" />

      <SearchInput
        v-model="searchValue"
        @search="onSearch"
        placeholder="Procurar cartas"
        :width="500"
      />

      <button @click="toggleTheme()">
        <h3>{{ theme }}</h3>
      </button>
    </Container>
  </div>
</template>
<style lang="scss" scoped>
.header-container {
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
* {
  color: var(--color-text);
}
</style>
