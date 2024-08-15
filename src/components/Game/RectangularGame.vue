<script setup lang="ts">
import { Game } from "../../classes/Game";
import Seat from "./Seat.vue";

const { game } = defineProps<{
  game: Game;
}>();
</script>

<template>
  <div
    class="grid-game"
    :style="{
      gridTemplateColumns: `repeat(${2 * (1 + game.layout.size.x)},${
        40 / (1 + Math.max(game.layout.size.x, game.layout.size.y))
      }${
        game.layout.size.x == game.layout.size.y
          ? 'vmin'
          : Math.max(game.layout.size.x, game.layout.size.y) == game.layout.size.x
          ? 'vw'
          : 'vh'
      })`,
      gridTemplateRows: `repeat(${2 * (1 + game.layout.size.y)},${
        40 / (1 + Math.max(game.layout.size.x, game.layout.size.y))
      }${
        game.layout.size.x == game.layout.size.y
          ? 'vmin'
          : Math.max(game.layout.size.x, game.layout.size.y) == game.layout.size.x
          ? 'vw'
          : 'vh'
      })`,
    }"
  >
    <div
      class="poker-table flex flex-column justify-content-evenly align-items-center"
      style="grid-column: 2/-2; grid-row: 2/-2"
    >
      <slot></slot>
    </div>
    <template v-for="i in game.layout.size.x">
      <Seat
        :game="game"
        :index="i"
        :style="{
          gridColumn: `${2 * i}/span 2`,
        }"
        @pawnClick="(i) => $emit('pawnClick', i)"
      />

      <Seat
        :game="game"
        :index="game.layout.size.x * 2 + game.layout.size.y - i + 1"
        :style="{
          gridColumn: `${2 * i}/span 2`,
          gridRow: '-2',
        }"
        @pawnClick="(i) => $emit('pawnClick', i)"
      />
    </template>
    <template v-for="i in game.layout.size.y">
      <Seat
        :game="game"
        :index="game.layout.size.x + i"
        :style="{
          gridColumn: `-2`,
          gridRow: `${2 * i}/span 2`,
        }"
        vertical
        @pawnClick="(i) => $emit('pawnClick', i)"
      />
      <Seat
        :game="game"
        :index="game.layout.size.x * 2 + game.layout.size.y * 2 - i + 1"
        :style="{
          gridRow: `${2 * i}/span 2`,
        }"
        vertical
        @pawnClick="(i) => $emit('pawnClick', i)"
      />
    </template>
  </div>
</template>

<style scoped></style>
