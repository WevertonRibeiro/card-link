<script setup lang="ts">
import { watch, ref } from "vue";
import type { Card } from "@/modules/card/types/card.model";
import Button from "@/components/ui/Button.vue";

interface Props {
  isOpen: boolean;
  availableCards: Card[];
}

interface Emits {
  (e: "update:isOpen", value: boolean): void;
  (e: "selectCards", cardIds: string[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedCardIds = ref<string[]>([]);

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
);

function handleClose() {
  selectedCardIds.value = [];
  emit("update:isOpen", false);
}

function handleSelectCards() {
  if (selectedCardIds.value.length > 0) {
    emit("selectCards", selectedCardIds.value);
    selectedCardIds.value = [];
    handleClose();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-show="isOpen" class="modal-overlay" @click="handleClose">
      <div class="modal-content" @click.stop>
        <h3>Selecionar Cartas para Adicionar</h3>
        <div class="cards-list">
          <div v-for="card in availableCards" :key="card.id" class="card-item">
            <input
              type="checkbox"
              :id="`card-${card.id}`"
              v-model="selectedCardIds"
              :value="card.id"
            />
            <label :for="`card-${card.id}`" class="card-label">
              <img :src="card.imageUrl" alt="Card" class="card-image" />
              <span>{{ card.name }}</span>
            </label>
          </div>
        </div>
        <div class="modal-actions">
          <Button @click="handleClose" variant="danger">Cancelar</Button>
          <Button
            @click="handleSelectCards"
            :disabled="selectedCardIds.length === 0"
          >
            Adicionar Selecionadas
          </Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-surface);
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  width: 90%;

  h3 {
    margin-bottom: 16px;
    color: var(--color-text);
  }

  .cards-list {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      max-height: 300px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--color-surface-secundary);
    }
    &::-webkit-scrollbar {
      width: 6px;
      background: var(--color-surface);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
    }

    .card-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      input[type="checkbox"] {
        margin-right: 8px;
      }

      .card-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--color-text);

        .card-image {
          width: 40px;
          height: 40px;
          object-fit: cover;
          margin-right: 8px;
        }
      }
    }
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>
