<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
defineProps<{
  to: Object;
  title: string;
  info?: string;
  icon?: string;
}>();
</script>

<template>
  <Button :label="title" :icon="icon" v-tooltip="info" @click="router.push(to)" />
</template>

<style scoped>
Button {
  margin: 10px 0 10px 0;
  padding: 20px;

  box-shadow: 3px 3px 10px 10px rgba(0, 0, 0, 0.25);

  width: min(400px, 80vw);

  transition: all 0.2s;
  &:hover:not(:disabled) {
    box-shadow: 0 0 10px 0px #ffffff;
    transform: scale(1.05);
  }

  & :deep(.p-button-label) {
    font-size: larger;
    font-family: "Rubik";
    font-weight: 600;
  }
}
</style>
