<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import cardBack from "@/assets/images/yugioh-card-back.jpg";

type GameCardProps = {
  image: string;
};

const props = defineProps<GameCardProps>();

const cardRef = ref<HTMLElement | null>(null);
const placeholderRef = ref<HTMLElement | null>(null);

let rafId: number | null = null;
let currentX = 0;
let currentY = 0;

const isActive = ref(false);
const isClosing = ref(false);
const isVisible = ref(false);

const modalStyle = ref<Record<string, string>>({});

onMounted(() => {
  const card = cardRef.value;
  if (!card) return;

  const maxRotation = 15;

  const updateTransform = () => {
    if (isActive.value) return;
    card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(1.05)`;
    rafId = null;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (isActive.value) return;
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
    if (isActive.value) return;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    card.style.transition = "transform 300ms ease";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setTimeout(() => {
      if (!isActive.value && card) card.style.transition = "";
    }, 300);
  };

  card.style.willChange = "transform";
  card.addEventListener("mousemove", mouseMoveHandler);
  card.addEventListener("mouseleave", reset);
});

const openModal = async () => {
  if (isActive.value) return;
  const placeholder = placeholderRef.value;
  if (!placeholder) return;

  const rect = placeholder.getBoundingClientRect();

  modalStyle.value = {
    willChange: "transform",
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transform: `translate(${rect.left}px, ${rect.top}px) perspective(1000px) rotateY(0deg) scale(1)`,
    transition: 'none',
    zIndex: '9999',
    transformOrigin: 'center center'
  };

  isActive.value = true;

  await nextTick();

  requestAnimationFrame(() => {
    document.body.style.overflow = 'hidden';
    isVisible.value = true;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const cardCenterX = rect.width / 2;
    const cardCenterY = rect.height / 2;

    const targetX = centerX - cardCenterX;
    const targetY = centerY - cardCenterY;

    const paddingX = window.innerWidth > 768 ? 100 : 20;
    const paddingY = window.innerHeight > 768 ? 100 : 40;
    const maxScaleWidth = (window.innerWidth - paddingX * 2) / rect.width;
    const maxScaleHeight = (window.innerHeight - paddingY * 2) / rect.height;
    const scale = Math.min(maxScaleWidth, maxScaleHeight, 4);

    modalStyle.value = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      transform: `translate3d(${targetX}px, ${targetY}px, 0) perspective(1000px) rotateY(360deg) scale(${scale})`,
      transition: 'transform 1000ms',
      zIndex: '9999',
      transformOrigin: 'center center'
    };
  })
};

const closeModal = () => {
  if (!isActive.value || isClosing.value) return;
  isVisible.value = false;
  isClosing.value = true;

  const placeholder = placeholderRef.value;
  if (!placeholder) {
    isActive.value = false;
    isClosing.value = false;
    return;
  }

  const rect = placeholder.getBoundingClientRect();

  modalStyle.value = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transform: `translate(${rect.left}px, ${rect.top}px) perspective(1000px) rotateY(0deg) scale(1)`,
    transition: 'transform 500ms',
    zIndex: '9999',
    transformOrigin: 'center center'
  };

  setTimeout(() => {
    isActive.value = false;
    isClosing.value = false;
    if (cardRef.value) {
      cardRef.value.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
    document.body.style.overflow = 'auto';
  }, 500);
};
</script>
<template>
  <div class="card-placeholder" ref="placeholderRef">
    <div ref="cardRef" class="card-wrapper" :style="{ opacity: isActive ? 0 : 1 }" @click="openModal">
      <div class="card-front">
        <img :src="image" />
      </div>
      <div class="card-back">
        <img :src="cardBack" alt="" />
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isActive" class="modal-backdrop" :class="{ 'is-visible': isVisible }" @click="closeModal"></div>

      <div v-if="isActive" class="card-wrapper modal-card" :style="modalStyle" @click="closeModal">
        <div class="card-front">
          <img :src="image" />
        </div>
        <div class="card-back">
          <img :src="cardBack" alt="" />
        </div>
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
.card-placeholder {
  position: relative;
}

.card-wrapper {
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;

  transition: transform 120ms ease-out;

  &.modal-card {
    will-change: auto;
  }

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

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9998;
  opacity: 0;
  transition: opacity 500ms ease;
  backdrop-filter: blur(4px);

  &.is-visible {
    opacity: 1;
  }
}
</style>
