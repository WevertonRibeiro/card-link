<script setup lang="ts">
import { watch, ref } from "vue";
import type { Card } from "@/modules/card/types/card.model";
import type { TradeCardRequestDTO } from "../types/trade.dto";
import Button from "@/components/ui/Button.vue";

interface Props {
  isOpen: boolean;
  availableCards: Card[];
  collection: Card[];
}

interface Emits {
  (e: "update:isOpen", value: boolean): void;
  (e: "selectTrade", cards: TradeCardRequestDTO[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const receivingCardIds = ref<string[]>([]);
const offeringCardIds = ref<string[]>([]);

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
  receivingCardIds.value = [];
  offeringCardIds.value = [];
  emit("update:isOpen", false);
}

function handleCreateTrade() {
  const tradeCards: TradeCardRequestDTO[] = [
    ...receivingCardIds.value.map((cardId) => ({
      cardId,
      type: "RECEIVING" as const,
    })),
    ...offeringCardIds.value.map((cardId) => ({
      cardId,
      type: "OFFERING" as const,
    })),
  ];

  if (tradeCards.length > 0) {
    emit("selectTrade", tradeCards);
    receivingCardIds.value = [];
    offeringCardIds.value = [];
    handleClose();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-show="isOpen" class="modal-overlay" @click="handleClose">
      <div class="modal-content" @click.stop>
        <h3>Solicitar Troca</h3>

        <div class="trade-sections">
          <div class="trade-section">
            <h4>Cartas a Receber</h4>
            <div class="cards-list">
              <div
                v-for="card in availableCards"
                :key="`receiving-${card.id}`"
                class="card-item"
              >
                <input
                  type="checkbox"
                  :id="`receiving-${card.id}`"
                  v-model="receivingCardIds"
                  :value="card.id"
                />
                <label :for="`receiving-${card.id}`" class="card-label">
                  <img :src="card.imageUrl" alt="Card" class="card-image" />
                  <span>{{ card.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="trade-section">
            <h4>Cartas a Oferecer</h4>
            <div class="cards-list">
              <div
                v-for="card in collection"
                :key="`offering-${card.id}`"
                class="card-item"
              >
                <input
                  type="checkbox"
                  :id="`offering-${card.id}`"
                  v-model="offeringCardIds"
                  :value="card.id"
                />
                <label :for="`offering-${card.id}`" class="card-label">
                  <img :src="card.imageUrl" alt="Card" class="card-image" />
                  <span>{{ card.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <Button @click="handleClose">Cancelar</Button>
          <Button
            @click="handleCreateTrade"
            :disabled="
              receivingCardIds.length === 0 || offeringCardIds.length === 0
            "
          >
            Solicitar Troca
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
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  width: 90%;

  h3 {
    margin-bottom: 20px;
    color: var(--color-text);
  }

  .trade-sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .trade-section {
      h4 {
        margin-bottom: 12px;
        font-size: 0.95rem;
        color: var(--color-text);
      }

      .cards-list {
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid var(--color-surface-secundary);
        border-radius: 4px;
        padding: 8px;

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
          padding: 8px 0;
          border-bottom: 1px solid var(--color-surface-secundary);

          &:last-child {
            border-bottom: none;
          }

          input[type="checkbox"] {
            margin-right: 8px;
            cursor: pointer;
          }

          .card-label {
            display: flex;
            align-items: center;
            cursor: pointer;
            flex: 1;

            .card-image {
              width: 32px;
              height: 32px;
              object-fit: cover;
              margin-right: 8px;
              border-radius: 2px;
            }

            span {
              color: var(--color-text);
              font-size: 0.9rem;
            }
          }
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
