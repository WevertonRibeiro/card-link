<script setup lang="ts">
import { computed } from "vue";

type ProfileProps = {
  name: string;
  showFullName?: boolean;
  actionTitle?: string;
  action?: () => void;
  reverse?: boolean;
};

const props = defineProps<ProfileProps>();

const initials = computed(() => {
  return props.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
});
</script>
<template>
  <div class="profile-wrapper" :class="{ reverse: reverse }">
    <div class="name-wrapper">
      <span v-if="props.showFullName" class="name">{{ props.name }}</span>
      <span v-if="props.action && props.actionTitle" @click.stop="action" class="action">{{ props.actionTitle }}</span>
      <span v-else>{{ props.actionTitle }}</span>
    </div>
    <div class="avatar-wrapper">
      <span>{{ initials }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;

  &.reverse {
    flex-direction: row-reverse;

    .name-wrapper {
      align-items: flex-start;
    }
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: var(--color-surface);
    border: solid 1px var(--color-border);
    border-radius: 50%;
    font-size: 1rem;

    span {
      color: var(--color-text);
      user-select: none;
    }

    @media (max-width: 900px) {
      width: 40px;
      height: 40px;

      span {
        font-size: 0.8rem;
      }
    }
  }

  .name-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 1rem;
    color: var(--color-text);

    .action {
      cursor: pointer;
      font-size: 0.9rem;
    }
  }
}
</style>
