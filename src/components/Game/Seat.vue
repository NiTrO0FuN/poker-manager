<script setup lang="ts">
import { Game, Blind } from "../../classes/Game";

const { game, index, vertical } = defineProps<{
  game: Game;
  index: number;
  vertical?: boolean;
}>();
</script>

<template>
  <div class="player">
    <div
      class="pawn relative"
      :class="{
        vertical,
        empty: !game.players.has(index),
        active: game.activeSeat.value == index,
        'small-blind': game.blinds.get(Blind.Small) == index,
        'big-blind': game.blinds.get(Blind.Big) == index,
        'p-disabled': game.players.get(index)?.folded,
      }"
      @click="$emit('pawnClick', index)"
    >
      <div
        v-if="game.players.has(index)"
        class="absolute top-0 -translate-y-100"
        style="color: var(--p-form-field-color)"
      >
        {{ game.players.get(index)?.betAmount.toLocaleString($i18n.locale) }}
      </div>
      {{ index }}
    </div>
  </div>
</template>

<style scoped>
.player {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
}
.pawn {
  color: var(--p-button-primary-color);
  background-color: var(--p-button-primary-background);
  &.empty {
    background: repeating-linear-gradient(
      45deg,
      var(--p-button-primary-background),
      var(--p-button-primary-background) 15%,
      var(--p-button-primary-active-background) 15%,
      var(--p-button-primary-active-background) 30%
    );
  }

  &.vertical {
    width: min(100%, 100px);
  }
  &:not(.vertical) {
    height: min(100%, 100px);
  }
  aspect-ratio: 1;
  border-radius: 50%;

  &.active {
    background-color: green;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik;
  font-weight: bold;

  cursor: pointer;
  user-select: none;
}

.big-blind {
  border: solid maroon 5px;
}

.small-blind {
  border: solid maroon 3px;
}
</style>
