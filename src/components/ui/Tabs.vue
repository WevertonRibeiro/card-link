<script setup lang="ts">
import { ref, watch } from "vue";

interface Tab {
  label: string;
  key: string;
}

const props = defineProps<{
  tabs: Tab[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const active = ref<string>(props.modelValue ?? props.tabs[0]?.key ?? "");

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== undefined && newVal !== active.value) {
      active.value = newVal;
    }
  },
);

function select(key: string) {
  if (active.value === key) return;
  active.value = key;
  emit("update:modelValue", key);
}
</script>

<template>
  <div class="tabs-wrapper">
    <nav class="tab-list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-button', { active: tab.key === active }]"
        role="tab"
        :aria-selected="tab.key === active"
        @click="select(tab.key)"
      >
        {{ tab.label }}
      </button>
    </nav>
    <div class="tab-content">
      <slot :active="active" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-wrapper {
  display: flex;
  flex-direction: column;
}

.tab-list {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 16px;

  .tab-button {
    background: transparent;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 16px;
    color: var(--color-text);
    position: relative;
    transition: color 0.2s;

    &.active {
      color: var(--color-text-active);
    }

    &:hover:not(.active) {
      color: var(--color-text-active);
    }

    &.active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 2px;
      background: var(--color-receive);
    }
  }
}

.tab-content {
  width: 100%;
}
</style>
