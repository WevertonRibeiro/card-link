<script lang="ts" setup>
import { TransferData, ArrowLeft, ArrowRight } from "@icon-park/vue-next";

type TradeThumbProps = {
  offering: string[];
  receiving: string[];
};

const props = defineProps<TradeThumbProps>();
</script>
<template>
  <div class="trade-thumb">
    <div class="left" :class="{ 'more-one': offering.length > 1 }">
      <img v-for="(card, index) in offering" :key="index" :src="card" />
    </div>
    <div class="middle">
      <ArrowLeft class="receive-icon" />
      <ArrowRight class="offer-icon" />
    </div>
    <div class="right" :class="{ 'more-one': receiving.length > 1 }">
      <img v-for="(card, index) in receiving" :key="index" :src="card" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.trade-thumb {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 5px;
  background: var(--color-surface);
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  padding: 30px 40px;
  img {
    width: 100%;
  }
}
.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .receive-icon {
    color: var(--color-receive);
  }
  .offer-icon {
    color: var(--color-offer);
  }
}
.left,
.right {
  position: relative;
  img {
    position: relative;
    border: solid 2px var(--color-surface);
    border-radius: 10px;
  }
  &.more-one {
    img {
      position: absolute;
      top: 0;
      left: 0;
      &:nth-of-type(1) {
        transform: translate(8px, 6px);
      }
      &:nth-of-type(2) {
        position: relative;
      }
      &:nth-of-type(3) {
        transform: translate(-8px, -6px);
      }
    }
  }
}
</style>
