<script setup lang="ts">
interface TextInputProps {
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: string;
  error?: string;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  type: "text",
  disabled: false,
  autocomplete: "off",
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
}
</script>

<template>
  <div class="text-input-wrapper">
    <label v-if="label" class="label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="text-input"
      :class="{ error: error }"
      :autocomplete="autocomplete"
      @input="onInput"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
.text-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
}

.text-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--color-text-secundary);
  }

  &:focus {
    outline: none;
    border-color: var(--color-receive);
    box-shadow: 0 0 0 3px rgba(120, 205, 166, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.error {
    border-color: var(--color-offer);

    &:focus {
      box-shadow: 0 0 0 3px rgba(184, 85, 105, 0.1);
    }
  }

  &::placeholder {
    color: var(--color-text-secundary);
  }
}

.error-message {
  font-size: 0.85rem;
  color: var(--color-offer);
}
</style>
