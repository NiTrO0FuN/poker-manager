<script setup lang="ts">
import { ref, onMounted } from "vue";
import MenuButton from "../components/MenuButton.vue";
import { TableLayout } from "../classes/TableLayout";

const hasLayouts = ref(false);
const quickLaunchId = ref("");
onMounted(() => {
  try {
    let storage = localStorage.getItem("tables_layout");
    if (storage) {
      let layouts: Array<TableLayout> = JSON.parse(storage);
      if (layouts.length > 0) hasLayouts.value = true;
      let qlId = localStorage.getItem("quick_launch");
      if (qlId && layouts.find((layout) => layout.id == qlId)) quickLaunchId.value = qlId;
    }
  } catch (error) {
    console.warn("Failed to load table templates from storage: ", error);
  }
});
</script>

<template>
  <div class="menu">
    <MenuButton
      :to="{ name: 'create_layout' }"
      :title="$t('menu.create_layout.title')"
      icon="pi pi-plus"
    />
    <MenuButton
      :disabled="!hasLayouts"
      :to="{ name: 'load_layout' }"
      :title="$t('menu.load_layout.title')"
      icon="pi pi-upload"
    />
    <MenuButton
      :disabled="quickLaunchId == ''"
      :to="{ name: 'play', query: { id: quickLaunchId } }"
      severity="success"
      :title="$t('menu.quick_launch.title')"
      v-tooltip="$t('menu.quick_launch.info')"
      icon="pi pi-bolt"
    />
  </div>
</template>

<style scoped>
.menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
