<script lang="ts" setup>
import { computed } from "vue";

import Container from "@/components/layout/Container.vue";
import Banner from "@/assets/images/banner.jpg";
import Card from "@/components/ui/Card.vue";
import CardSkeleton from "@/components/ui/CardSkeleton.vue";
import TradeThumb from "@/components/ui/TradeThumb.vue";
import GameCard from "@/components/ui/GameCard.vue";
import GameCardSkeleton from "@/components/ui/GameCardSkeleton.vue";
import { Star, History } from "@icon-park/vue-next";

import { useTradesQuery } from "@/modules/trade/composables/useTradesQuery";
import { useFeaturedCardsQuery } from "@/modules/card/composables/useCardsQuery";

import { getTradeCardImages } from "@/modules/trade/utils/tradeImages.utils";

const { data: tradesData, isLoading } = useTradesQuery();
const { data: featuredCardsData, isLoading: isLoadingCards } =
  useFeaturedCardsQuery();

const trades = computed(() => tradesData.value?.trades ?? []);

const tradeItems = computed(() =>
  trades.value.map((trade) => ({
    ...trade,
    offeringNames: trade.offeringCards.map((card) => card.name).join(", "),
    receivingNames: trade.receivingCards.map((card) => card.name).join(", "),
    offeringImages: getTradeCardImages(trade.offeringCards),
    receivingImages: getTradeCardImages(trade.receivingCards),
  })),
);
</script>
<template>
  <Container>
    <img :src="Banner" alt="Banner Principal" class="banner-home" />

    <div class="highlights-header">
      <h1><History size="23" class="icon" />Trocas Recentes</h1>
      <a href="#">VER TODAS</a>
    </div>

    <section class="trades-wrapper most-viewed">
      <template v-if="isLoading">
        <CardSkeleton v-for="n in 3" :key="`skeleton-${n}`" />
      </template>
      <template v-else>
        <Card v-for="trade in tradeItems.slice(0, 3)" :key="trade.id">
          <div class="top">
            <span>{{ trade.userName }}</span>
            <span>{{ trade.createdAt.toLocaleDateString("pt-BR") }}</span>
          </div>
          <TradeThumb
            :offering="trade.offeringImages"
            :receiving="trade.receivingImages"
          />
          <div class="trade-description-wrapper">
            <div>
              <p class="max-lines-2 receive">
                {{ trade.offeringNames }}
              </p>
              <p class="max-lines-2 offer">
                {{ trade.receivingNames }}
              </p>
            </div>
          </div>
        </Card>
      </template>
    </section>
  </Container>

  <div class="cards-highlights">
    <Container>
      <div class="highlights-header">
        <h1><Star size="25" class="icon star" />Cartas em destaque</h1>
        <a href="#">VER TODAS</a>
      </div>
    </Container>
    <div class="cards-wrapper">
      <Container class="cards">
        <template v-if="isLoadingCards">
          <GameCardSkeleton v-for="n in 5" :key="`card-skeleton-${n}`" />
        </template>
        <template v-else>
          <GameCard
            v-for="card in featuredCardsData"
            :key="card.id"
            :image="card.imageUrl"
          />
        </template>
      </Container>
    </div>
  </div>

  <Container>
    <div v-if="isLoading">
      <section class="trades-wrapper">
        <CardSkeleton v-for="n in 6" :key="`all-trades-skeleton-${n}`" />
      </section>
    </div>
    <section v-else class="trades-wrapper">
      <Card v-for="trade in tradeItems" :key="trade.id">
        <div class="top">
          <span>{{ trade.userName }}</span>
          <span>{{ trade.createdAt.toLocaleDateString("pt-BR") }}</span>
        </div>
        <TradeThumb
          :offering="trade.offeringImages"
          :receiving="trade.receivingImages"
        />
        <div class="trade-description-wrapper">
          <div>
            <p class="max-lines-2 receive">
              {{ trade.offeringNames }}
            </p>
            <p class="max-lines-2 offer">
              {{ trade.receivingNames }}
            </p>
          </div>
        </div>
      </Card>
    </section>
  </Container>
</template>
<style lang="scss" scoped>
.banner-home {
  width: 100%;
  border-radius: 16px;
}
.trades-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
  .top {
    display: flex;
    justify-content: space-between;
    color: var(--color-text);
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  .trade-description-wrapper {
    margin-top: 16px;
    padding-inline: 6px;
    .receive {
      color: var(--color-text);
      font-size: 1rem;
      margin-bottom: 5px;
    }
    .offer {
      color: var(--color-text-secundary);
      font-size: 0.9rem;
    }
  }
}
.cards-highlights {
  margin-bottom: 32px;
  .cards-wrapper {
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 800px) {
      overflow-x: auto;
    }
    .cards {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 16px;
      @media (max-width: 800px) {
        display: flex;
        width: max-content;
        :deep(.card-placeholder) {
          width: 150px;
        }
      }
    }
  }
}

.highlights-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 32px;
  h1 {
    color: var(--color-text);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 8px;
    @media (max-width: 700px) {
      font-size: 1.1rem;
    }
    .icon {
      line-height: 22px;
      &.star {
        color: var(--color-star);
      }
    }
  }
  a {
    color: var(--color-text);
    @media (max-width: 700px) {
      font-size: 0.8rem;
    }
  }
}

.error {
  color: var(--color-error, #e74c3c);
  padding: 1rem;
  text-align: center;
}
</style>
