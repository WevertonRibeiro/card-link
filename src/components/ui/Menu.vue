<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

import type { Component } from "vue";

interface MenuItem {
  icon: Component;
  label: string;
  action?: () => void;
}

const props = defineProps<{
  items: MenuItem[];
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="dropdown" ref="dropdownRef">
    <button class="dropdown-trigger" @click="toggle">
      <slot name="trigger">Menu</slot>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="dropdown-content">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="dropdown-item"
          @click="
            () => {
              item.action?.();
              close();
            }
          "
        >
          <component :is="item.icon" size="20" class="icon-wrapper" />
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 300px;
  background: var(--color-surface);
  border-radius: 10px;
  margin-top: 4px;
  border: 1px solid var(--color-border);
  z-index: 100;
  .header {
    display: flex;
    justify-content: flex-start;
    padding: 16px;
    border-bottom: 1px solid var(--color-border);
  }
  .dropdown-content {
    padding-block: 10px;
    .dropdown-item {
      padding-inline: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      height: 40px;
      color: var(--color-text);
      &:hover {
        background: var(--color-surface-secundary);
      }
      .icon-wrapper {
        line-height: 0;
      }
    }
  }
}
</style>
