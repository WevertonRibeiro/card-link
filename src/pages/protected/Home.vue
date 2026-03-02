<script lang="ts" setup>
import Container from "@/components/layout/Container.vue";
import Banner from "@/assets/images/banner.jpg";
import Card from "@/components/ui/Card.vue";
import TradeThumb from "@/components/ui/TradeThumb.vue";

const cards = {
  offering: [
    "https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/pt-br/M7XJ_PTBR_152-2x.png",
    "https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/pt-br/M7XJ_PTBR_152-2x.png",
    "https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/pt-br/M7XJ_PTBR_152-2x.png",
  ],
  receiving: [
    "https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/pt-br/M7XJ_PTBR_152-2x.png",
    "https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/pt-br/M7XJ_PTBR_152-2x.png",
    "https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/pt-br/M7XJ_PTBR_152-2x.png",
  ],
};
</script>
<template>
  <div>
    <Container>
      <img :src="Banner" alt="Banner Principal" class="banner-home" />
      <div class="most-viewed">
        <Card>
          <TradeThumb :offering="cards.offering" :receiving="cards.receiving" />
          <div class="description-wrapper">
            <!-- <TransferData /> -->
            <div>
              <p class="max-lines-2 receive">
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX
                Pikachu EX, Mega Dragonite EX, Pikachu EX.
              </p>
              <p class="max-lines-2 offer">
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX,
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <TradeThumb :offering="cards.offering" :receiving="cards.receiving" />
          <div class="description-wrapper">
            <!-- <TransferData /> -->
            <div>
              <p class="max-lines-2 receive">
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX
                Pikachu EX, Mega Dragonite EX, Pikachu EX.
              </p>
              <p class="max-lines-2 offer">
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX,
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <TradeThumb :offering="cards.offering" :receiving="cards.receiving" />
          <div class="description-wrapper">
            <!-- <TransferData /> -->
            <div>
              <p class="max-lines-2 receive">
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX
                Pikachu EX, Mega Dragonite EX, Pikachu EX.
              </p>
              <p class="max-lines-2 offer">
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX,
                Mega Charizard Y EX, Mewtwo EX, Pikachu EX, Mega Dragonite EX
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
<style lang="scss" scoped>
.banner-home {
  width: 100%;
  border-radius: 16px;
}
.most-viewed {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
