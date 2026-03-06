<script lang="ts" setup>
import { ref, onMounted } from "vue";

type GameCardProps = {
  image: string;
};

import cardBack from "@/assets/images/yugioh-card-back.jpg";

const props = defineProps<GameCardProps>();

const cardRef = ref<HTMLElement | null>(null);

let rafId: number | null = null;
let currentX = 0;
let currentY = 0;

onMounted(() => {
  const card = cardRef.value;
  if (!card) return;

  const maxRotation = 15;

  const updateTransform = () => {
    card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(1.05)`;
    rafId = null;
  };

  const handleMove = (clientX: number, clientY: number) => {
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    currentY = percentX * maxRotation;
    currentX = -percentY * maxRotation;

    if (!rafId) rafId = requestAnimationFrame(updateTransform);
  };

  const mouseMoveHandler = (e: MouseEvent) => handleMove(e.clientX, e.clientY);

  const reset = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    card.style.transition = "transform 300ms ease";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setTimeout(() => (card.style.transition = ""), 300);
  };

  card.style.willChange = "transform";
  card.addEventListener("mousemove", mouseMoveHandler);
  card.addEventListener("mouseleave", reset);
});
</script>
<template>
  <div class="card-placeholder">
    <div ref="cardRef" class="card-wrapper">
      <div class="card-front">
        <img :src="image" />
      </div>
      <div class="card-back">
        <img :src="cardBack" alt="" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-placeholder {
  .card-wrapper {
    position: relative;
    transform-style: preserve-3d;
    will-change: transform;
    cursor: pointer;

    transition: transform 120ms ease-out;

    .card-front,
    .card-back {
      display: block;
      width: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .card-front {
      position: relative;
      transform: translateZ(2px);
    }

    .card-back {
      position: absolute;
      top: 0;
      left: 0;
      transform: rotateY(180deg) translateZ(-1px);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      user-select: none;
      pointer-events: none;
    }
  }
}
</style>
