<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import Tabs from "@/components/ui/Tabs.vue";
import Container from "@/components/layout/Container.vue";
import GameCard from "@/components/ui/GameCard.vue";
import GameCardSkeleton from "@/components/ui/GameCardSkeleton.vue";
import Button from "@/components/ui/Button.vue";
import AddCardsModal from "@/modules/card/components/AddCardsModal.vue";
import AddTradeModal from "@/modules/trade/components/AddTradeModal.vue";
import Card from "@/components/ui/Card.vue";
import { useMeQuery } from "@/modules/auth/composables/useAuthQuery";

import {
  useMeCardsQuery,
  usePostMeCardsMutation,
  useCardsQuery,
} from "@/modules/card/composables/useCardsQuery";

import {
  useTradesQuery,
  useCreateTradeMutation,
} from "@/modules/trade/composables/useTradesQuery";
import type { TradeCardRequestDTO } from "@/modules/trade/types/trade.dto";

const { data: userCards, isLoading: isLoadingCards } = useMeCardsQuery();
const { data: allCards } = useCardsQuery(1000, 1);
const { data: tradesData } = useTradesQuery();
const { data: authData } = useMeQuery();

const postMeCards = usePostMeCardsMutation();
const createTrade = useCreateTradeMutation();

const showAddModal = ref(false);
const showTradeModal = ref(false);

const route = useRoute();
const router = useRouter();

const trades = computed(() => tradesData.value?.trades ?? []);
const collectionCards = computed(() => userCards.value ?? []);

const myTrades = computed(() => {
  if (!trades.value || !authData.value) return [];
  return trades.value.filter((trade) => trade.userId === authData.value.id);
});

const availableCards = computed(() => {
  if (!allCards.value || !userCards.value) return [];
  const userCardIds = new Set(userCards.value.map((card) => card.id));
  return allCards.value.filter((card) => !userCardIds.has(card.id));
});

const tabs = [
  { label: "Minha coleção", key: "collection" },
  { label: "Solicitações de troca", key: "requests" },
];

const currentTab = ref<string>(
  (route.query.tab as string) || (tabs[0] ? tabs[0].key : ""),
);

watch(currentTab, (newTab) => {
  router.replace({
    query: { ...route.query, tab: newTab },
  });
});

watch(
  () => route.query.tab,
  (tab) => {
    if (typeof tab === "string" && tabs.some((t) => t.key === tab)) {
      currentTab.value = tab;
    }
  },
  { immediate: true },
);

function handleSelectCards(cardIds: string[]) {
  postMeCards.mutate({ cardIds });
}

function handleCreateTrade(cards: TradeCardRequestDTO[]) {
  createTrade.mutate({ cards });
}
</script>

<template>
  <div class="my-account-page">
    <Container>
      <Tabs :tabs="tabs" v-model="currentTab">
        <template #default="{ active }">
          <div v-if="active === 'collection'" class="tab-panel">
            <div class="collection-header">
              <Button @click="showAddModal = true">Adicionar Carta</Button>
            </div>
            <div class="my-collection-wrapper">
              <template v-if="isLoadingCards">
                <GameCardSkeleton v-for="n in 10" :key="`card-skeleton-${n}`" />
              </template>
              <template v-else>
                <GameCard
                  v-for="userCard in userCards"
                  :key="userCard.id"
                  :image="userCard.imageUrl"
                />
              </template>
            </div>
          </div>

          <div v-else-if="active === 'requests'" class="tab-panel">
            <div class="requests-wrapper">
              <div class="collection-header">
                <Button @click="showTradeModal = true">Solicitar troca</Button>
              </div>
              <div class="trade-list">
                <Card
                  v-for="trade in myTrades"
                  :key="trade.id"
                  class="trade-card"
                >
                  <div class="receive">
                    <h2>A Receber</h2>
                    <div class="cards">
                      <img
                        v-for="card in trade.receivingCards"
                        :key="card.id"
                        :src="card.imageUrl"
                      />
                    </div>
                  </div>
                  <div class="offering">
                    <h2>Oferecendo</h2>
                    <div class="cards">
                      <img
                        v-for="card in trade.offeringCards"
                        :key="card.id"
                        :src="card.imageUrl"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </template>
      </Tabs>
    </Container>

    <AddCardsModal
      :isOpen="showAddModal"
      :availableCards="availableCards"
      @update:isOpen="showAddModal = $event"
      @selectCards="handleSelectCards"
    />

    <AddTradeModal
      :isOpen="showTradeModal"
      :collection="collectionCards"
      :availableCards="availableCards"
      @update:isOpen="showTradeModal = $event"
      @selectTrade="handleCreateTrade"
    />
  </div>
</template>

<style scoped lang="scss">
.my-account-page {
  h1 {
    margin-bottom: 24px;
  }

  .tab-panel {
    padding-top: 16px;
    .collection-header {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-bottom: 24px;
    }
    .my-collection-wrapper {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 24px;
      @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  .trade-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .trade-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px 48px;
      @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .receive,
  .offering {
    h2 {
      font-size: 1rem;
      color: var(--color-text);
      margin-bottom: 0.5rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      height: fit-content;
      @media (max-width: 900px) {
        display: flex;
        overflow-x: auto;
        img {
          width: 100px;
        }
      }
    }
  }
}
</style>
