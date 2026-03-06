<script setup lang="ts">
import { Search } from "@icon-park/vue-next";

interface SearchInputProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  width?: number;
}

const props = defineProps<SearchInputProps>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
}

function onSearch(event: KeyboardEvent | PointerEvent) {
  if (event instanceof KeyboardEvent && event.key === "Enter") {
    emits("search", props.modelValue);
    return;
  }
  if (event instanceof PointerEvent) {
    emits("search", props.modelValue);
  }
}
</script>

<template>
  <div class="search-wrapper" :style="`max-width: ${props.width}px`">
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="search-input"
      @input="onInput"
      @keyup="onSearch"
    />
    <button @click="onSearch" class="search-btn">
      <Search theme="outline" size="20" class="icon-search" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.search-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  .search-input {
    flex: 1;
    padding-inline: 1rem;
    border: 1px solid var(--color-border, #ccc);
    border-radius: 30px 0 0 30px;
    font-size: 1rem;
    background: var(--color-background);
    color: var(--color-text);
    height: 40px;
    outline: none;
  }
  .search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface);
    height: 40px;
    width: 60px;
    padding-inline-end: 4px;
    border-radius: 0 30px 30px 0;
    border: 1px solid var(--color-border, #ccc);
    border-left: none;
    cursor: pointer;
    .icon-search {
      color: var(--color-text);
    }
  }
}

.search-input:disabled {
  background-color: var(--color-disabled-bg, #f5f5f5);
  cursor: not-allowed;
}
</style>
