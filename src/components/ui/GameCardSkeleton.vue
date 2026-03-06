<script lang="ts" setup></script>
<template>
  <div class="card-placeholder">
    <div class="card-skeleton">
      <div class="skeleton-image"></div>
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

.card-placeholder {
  .card-skeleton {
    width: 100%;
    aspect-ratio: 11/16;
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
}
</style>
