<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Game } from "../../classes/Game";
import Seat from "./Seat.vue";
const { t } = useI18n();

const { game } = defineProps<{
  game: Game;
}>();
</script>

<template>
  <div
    class="poker-table flex flex-column justify-content-evenly align-items-center relative"
    id="circular"
  >
    <slot></slot>
    <Seat
      v-for="i in game.playerNumber()"
      :game="game"
      :index="i"
      class="seat absolute"
      :style="{
        offsetDistance: `${(100 / game.playerNumber()) * (i - 1)}%`,
        width: '20%',
        height: '20%',
      }"
      @pawnClick="(i) => $emit('pawnClick', i)"
    />
  </div>
</template>

<style scoped>
#circular {
  border-radius: 50%;
  width: 55vmin;
  aspect-ratio: 1;
}

.seat {
  offset-path: circle(60%);
  offset-rotate: 0deg;
}
</style>
