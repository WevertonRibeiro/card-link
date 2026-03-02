<script lang="ts" setup>
import { computed, ref } from "vue";
import { useTheme } from "@/composables/useTheme";
import Container from "@/components/layout/Container.vue";
import SearchInput from "@/components/ui/SearchInput.vue";
import Profile from "@/components/ui/Profile.vue";
import Menu from "@/components/ui/Menu.vue";

import {
  AllApplication,
  Logout,
  TransferData,
  Sun,
  Moon,
} from "@icon-park/vue-next";

const searchValue = ref("");
const { theme, toggleTheme } = useTheme();

const items = computed(() => {
  return [
    {
      icon: AllApplication,
      label: "Minha coleção",
      action: () => console.log("Perfil"),
    },
    {
      icon: TransferData,
      label: "Trocas ativas",
      action: () => console.log("Config"),
    },
    {
      icon: theme.value === "light" ? Moon : Sun,
      label: theme.value === "light" ? "Tema escuro" : "Tema claro",
      action: () => toggleTheme(),
    },
    {
      icon: Logout,
      label: "Sair",
      action: () => console.log("Logout"),
    },
  ];
});

const onSearch = (value: string) => {
  console.log(value);
};

const handleLogout = () => {
  console.log("Logout");
};
</script>
<template>
  <div class="header">
    <Container class="header-container">
      <img src="../../assets/images/logo-cardlink.svg" class="logo" />

      <SearchInput
        v-model="searchValue"
        @search="onSearch"
        placeholder="Procurar cartas"
        :width="500"
        class="search"
      />

      <Menu :items="items" class="profile-wrapper">
        <template #trigger>
          <Profile
            name="Weverton Ribeiro"
            showFullName
            actionTitle="Sair"
            :action="handleLogout"
            class="profile-header"
          />
        </template>
        <template #header>
          <Profile
            name="Weverton Ribeiro"
            showFullName
            actionTitle="emaildoerto@gmail.com"
            reverse
          />
        </template>
      </Menu>
    </Container>
  </div>
</template>
<style lang="scss" scoped>
.header-container {
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 30px;
  }

  @media (max-width: 900px) {
    .logo {
      height: 25px;
    }
    .profile-wrapper {
      justify-self: end;
    }
    .profile-header {
      :deep(.name-wrapper) {
        display: none;
      }
    }
  }

  @media (max-width: 700px) {
    height: unset;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding-block: 16px;

    .search {
      grid-column: 1 /3;
      grid-row: 2;
    }
  }
}
</style>
