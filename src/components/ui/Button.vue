<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "medium",
  type: "button",
  disabled: false,
  fullWidth: false,
  loading: false,
});

const buttonClass = computed(() => ({
  [props.variant]: true,
  [props.size]: true,
  "full-width": props.fullWidth,
}));
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="button"
    :class="buttonClass"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Variants
  &.primary {
    background: var(--color-receive);
    color: var(--color-surface);

    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(120, 205, 166, 0.2);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &.secondary {
    background: var(--color-surface-secundary);
    color: var(--color-text);
    border: 2px solid var(--color-border);

    &:hover:not(:disabled) {
      border-color: var(--color-text-secundary);
    }
  }

  &.outline {
    background: transparent;
    color: var(--color-receive);
    border: 2px solid var(--color-receive);

    &:hover:not(:disabled) {
      background: rgba(120, 205, 166, 0.1);
    }
  }

  &.danger {
    background: transparent;
    color: var(--color-danger);
    border: 2px solid var(--color-danger);

    &:hover:not(:disabled) {
      background: rgba(120, 205, 166, 0.1);
    }
  }

  // Sizes
  &.small {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  &.medium {
    padding: 12px 24px;
    font-size: 1rem;
  }

  &.large {
    padding: 16px 32px;
    font-size: 1.1rem;
  }

  &.full-width {
    width: 100%;
  }
}
</style>
