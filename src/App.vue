<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <Toast />
  <ConfirmPopup />
  <FloatLabel class="absolute right-0 md:m-5 z-5">
    <Select
      v-model="$i18n.locale"
      :options="$i18n.availableLocales"
      inputId="language"
      pt:dropdown:class="hidden"
    >
      <template #value="{ value }">
        <div class="flex justify-content-center">
          <img
            :alt="value"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`flag flag-${value.toLowerCase()}`"
            style="width: 18px"
          />
        </div>
      </template>
      <template #option="{ option }">
        <div class="w-full flex justify-content-center">
          <img
            :alt="option"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`flag flag-${option.toLowerCase()}`"
            style="width: 18px"
          />
        </div>
      </template>
    </Select>
    <label for="language">{{ $i18n.locale.toUpperCase() }}</label>
  </FloatLabel>
  <Button
    v-if="route.name != 'home'"
    as="router-link"
    to="home"
    icon="pi pi-home"
    class="absolute md:m-5 z-5"
  />
  <RouterView />
</template>

<style></style>
