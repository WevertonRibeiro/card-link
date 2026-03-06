<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTheme } from "@/composables/useTheme";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useMeQuery } from "@/modules/auth/composables/useAuthQuery";

import Container from "@/components/layout/Container.vue";
import SearchInput from "@/components/ui/SearchInput.vue";
import Profile from "@/components/ui/Profile.vue";
import Menu from "@/components/ui/Menu.vue";
import Logo from "@/components/ui/Logo.vue";

import {
  AllApplication,
  Logout,
  TransferData,
  Sun,
  Moon,
} from "@icon-park/vue-next";

const searchValue = ref("");

const router = useRouter();
const { theme, toggleTheme } = useTheme();
const { data: user } = useMeQuery();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const items = computed(() => {
  return [
    {
      icon: AllApplication,
      label: "Minha coleção",
      action: () =>
        router.push({ path: "/my-account", query: { tab: "collection" } }),
    },
    {
      icon: TransferData,
      label: "Trocas ativas",
      action: () =>
        router.push({ path: "/my-account", query: { tab: "requests" } }),
    },
    {
      icon: theme.value === "light" ? Moon : Sun,
      label: theme.value === "light" ? "Tema escuro" : "Tema claro",
      action: toggleTheme,
    },
    {
      icon: Logout,
      label: "Sair",
      action: handleLogout,
    },
  ];
});

const onSearch = (value: string) => {
  console.log(value);
};

const handleLogout = () => {
  authStore.clearSession();
  router.push("/");
};
</script>
<template>
  <div class="header">
    <Container class="header-container">
      <router-link to="/"><Logo class="logo" /></router-link>

      <SearchInput
        v-model="searchValue"
        @search="onSearch"
        placeholder="Procurar cartas"
        :width="500"
        class="search"
      />

      <Menu :items="items" class="profile-wrapper" :disabled="!isAuthenticated">
        <template #trigger>
          <Profile
            v-if="isAuthenticated"
            :name="user?.name || ''"
            showFullName
            actionTitle="Sair"
            :action="handleLogout"
            class="profile-header"
          />
          <Profile
            v-else
            name=""
            actionTitle="Entrar"
            :action="() => router.push('auth/login')"
            class="profile-header"
          />
        </template>
        <template #header>
          <Profile
            :name="user?.name || ''"
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
