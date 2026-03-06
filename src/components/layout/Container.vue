<template>
  <div class="container"><slot /></div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
  margin-block: 0;
  padding-inline: 16px;
  @media (max-width: 1400px) {
    max-width: 1200px;
  }
}
</style>
