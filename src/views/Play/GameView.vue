<script setup lang="ts">
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { Game, GameStep } from "../../classes/Game";
import { TableLayout, TableShape } from "../../classes/TableLayout";
import RectangularGame from "../../components/Game/RectangularGame.vue";
import CircularGame from "../../components/Game/CircularGame.vue";
import CenterPanel from "../../components/Game/CenterPanel.vue";
const router = useRouter();
const toast = useToast();
const { t } = useI18n();

const { id } = defineProps<{
  id: string;
}>();

function handleClick(seat: number) {
  switch (game.step.value) {
    case GameStep.PlayerSelection:
      game.togglePlayer(seat);
      break;
    case GameStep.StartingSelection:
      if (!game.players.has(seat)) {
        return;
      }
      game.activeSeat.value = seat;
      break;
    default:
      break;
  }
}

function createGame() {
  try {
    // Save for quick launch
    localStorage.setItem("quick_launch", id);
    // Load layout
    let storage = localStorage.getItem("tables_layout");
    if (storage) {
      let layouts: Array<TableLayout> = JSON.parse(storage);
      let layout = layouts.find((layout) => layout.id === id);
      if (layout) {
        return new Game(layout);
      } else {
        throw new Error("Table id not found in storage");
      }
    } else {
      throw new Error("Table id not found in storage, storage empty");
    }
  } catch (error) {
    console.error(error);
    toast.add({
      severity: "error",
      summary: t("game.error_loading.summary"),
      detail: t("game.error_loading.detail"),
      closable: false,
      life: 5000,
    });
    router.push("home");
    return new Game(new TableLayout(TableShape.Rectangle)); // Just to not crash
  }
}

const game = createGame();
</script>

<template>
  <div class="px-6 md:p-3 font-bold text-5xl w-full md:text-center absolute">
    {{ game.layout.name }}
  </div>
  <div class="flex justify-content-center align-items-center h-full">
    <RectangularGame
      v-if="game.layout.shape == TableShape.Rectangle"
      :game="game"
      @pawnClick="handleClick"
    >
      <CenterPanel :game="game" />
    </RectangularGame>
    <CircularGame
      v-else-if="game.layout.shape == TableShape.Circle"
      :game="game"
      @pawnClick="handleClick"
    >
      <CenterPanel :game="game"
    /></CircularGame>
  </div>
  <div
    v-if="game.step.value == GameStep.InGame"
    class="px-6 md:p-3 text-xl w-full md:text-center absolute bottom-0"
  >
    {{
      t("game.actual_pot", {
        amount: game.pot.value.toLocaleString($i18n.locale),
      })
    }}
  </div>
</template>

<style scoped></style>
