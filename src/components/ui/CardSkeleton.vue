<script lang="ts" setup></script>
<template>
  <div class="card-skeleton">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-line skeleton-line-1"></div>
      <div class="skeleton-line skeleton-line-2"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.card-skeleton {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: var(--color-surface-secundary);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--color-surface-secundary) 25%,
    var(--color-surface) 50%,
    var(--color-surface-secundary) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--color-surface-secundary) 25%,
    var(--color-surface) 50%,
    var(--color-surface-secundary) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;

  &.skeleton-line-1 {
    width: 85%;
  }

  &.skeleton-line-2 {
    width: 60%;
  }
}
</style>
