<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Game, GameStep } from "../../classes/Game";
const { t } = useI18n();

const { game } = defineProps<{
  game: Game;
}>();
</script>

<template>
  <div class="info">{{ t(game.info.value) }}</div>
  <div v-if="game.step.value == GameStep.BlindSelection">
    <InputNumber
      v-model="game.blindAmount.value"
      inputId="integeronly"
      :locale="$i18n.locale"
    />
  </div>
  <div v-else-if="game.step.value == GameStep.InGame">
    <span class="font-bold block mb-2 text-white">{{
      t("game.amount_to_call", {
        amount: game.amountToCall.value.toLocaleString($i18n.locale),
      })
    }}</span>
    <InputNumber
      v-model="game.currentBet.value"
      inputId="integeronly"
      :locale="$i18n.locale"
    />
  </div>
  <Button
    v-if="game.step.value != GameStep.Ended"
    :label="t('next')"
    pt:label:class="font-bold"
    @click="game.nextStep()"
  />
  <Button
    v-if="game.step.value == GameStep.InGame"
    :label="t('game.fold')"
    @click="game.fold()"
  />
</template>

<style scoped></style>
