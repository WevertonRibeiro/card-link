<script lang="ts" setup>
import { TransferData } from "@icon-park/vue-next";
</script>
<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.card-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: var(--color-surface-secundary);
  padding: 16px;
}

.receive {
  color: var(--color-text);
  font-size: 1rem;
  margin-bottom: 3px;
}
.offer {
  color: var(--color-text-secundary);
  font-size: 0.8rem;
}
</style>
