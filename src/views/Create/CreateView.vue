<script setup lang="ts">
import { useRouter } from "vue-router";
import { TableShape } from "../../classes/TableLayout";
const router = useRouter();
</script>

<template>
  <div class="flex flex-column align-items-center h-full">
    <span class="title text-2xl md:text-6xl">{{
      $t("create_layout.info")
    }}</span>
    <div
      class="flex flex-wrap justify-content-evenly align-items-center h-full w-full"
    >
      <Card
        class="layout color-primary"
        v-tooltip="$t('create_layout.rectangle.info')"
        pt:caption:class="text-center mb-5"
        pt:content:class="flex justify-content-center"
        @click="
          router.push({
            name: 'create_table',
            params: { shape: TableShape.Rectangle },
          })
        "
      >
        <template #title>{{ $t("create_layout.rectangle.title") }}</template>
        <template #content>
          <div class="poker-table" id="rectangular"></div
        ></template>
      </Card>
      <Card
        class="layout"
        v-tooltip="$t('create_layout.circle.info')"
        pt:title:class="text-center mb-5"
        pt:content:class="flex h-full justify-content-center"
        @click="
          router.push({
            name: 'create_table',
            params: { shape: TableShape.Circle },
          })
        "
      >
        <template #title>{{ $t("create_layout.circle.title") }}</template>
        <template #content>
          <div class="poker-table" id="circular"></div
        ></template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin: 20px 10px 20px 10px;
  text-align: center;
}

.layout {
  width: min(400px, 80vw);
  margin: 10px;
}

.p-card {
  background-color: var(--p-primary-color);
  box-shadow: 3px 3px 10px 10px rgba(0, 0, 0, 0.25);

  cursor: pointer;
  transition: all 0.21s;
  &:hover {
    box-shadow: 0 0 10px 0px #ffffff;
    transform: scale(1.05);
  }

  & :deep(.p-button-label) {
    font-size: larger;
    font-family: "Rubik";
    font-weight: 600;
  }
}

:deep(.p-card-title) {
  color: sienna;
  font-family: Rubik;
  font-size: 20pt;
}

#rectangular {
  border-radius: 15px;
  width: 60%;
  aspect-ratio: 1/2;
}

#circular {
  border-radius: 50%;
  width: 60%;
  aspect-ratio: 1;
}
</style>
