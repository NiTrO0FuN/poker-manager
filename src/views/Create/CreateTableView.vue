<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { TableLayout, TableShape } from "../../classes/TableLayout";
const { t } = useI18n();
const router = useRouter();
const toast = useToast();

const { shape } = defineProps<{
  shape: TableShape;
}>();

const newLayout = reactive(new TableLayout(shape));
if (shape == TableShape.Circle) newLayout.size.x = 3;

function createTable() {
  let storage = localStorage.getItem("tables_layout");
  let layouts: Array<TableLayout> = [];

  try {
    if (storage) {
      layouts = JSON.parse(storage);
    }
  } catch (_) {
    toast.add({
      severity: "warn",
      summary: t("create_layout.data_corrupted.summary"),
      detail: t("create_layout.data_corrupted.detail"),
      closable: false,
      life: 5000,
    });
  }

  layouts.push(newLayout);

  try {
    localStorage.setItem("tables_layout", JSON.stringify(layouts));
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("create_layout.error_saving.summary"),
      detail: t("create_layout.error_saving.detail"),
      closable: false,
      life: 5000,
    });
    return;
  }

  toast.add({
    severity: "success",
    summary: t("create_layout.success_saving.summary"),
    detail: t("create_layout.success_saving.detail"),
    closable: false,
    life: 5000,
  });

  router.push({ name: "home" });
}
</script>

<template>
  <div class="flex justify-content-center align-items-center h-full">
    <div
      class="poker-table flex flex-column justify-content-center align-items-center"
      :id="shape == TableShape.Rectangle ? 'rectangular' : 'circular'"
    >
      <FloatLabel class="mb-5">
        <InputText
          id="table-name"
          v-model="newLayout.name"
          variant="filled"
          size="large"
        />
        <label
          for="table-name"
          class="text-lg font-bold"
          style="color: sienna"
          >{{ $t("create_layout.name") }}</label
        >
      </FloatLabel>

      <div
        v-if="shape == TableShape.Rectangle"
        class="flex align-items-center"
        v-tooltip.top="t('create_layout.rectangle.size')"
      >
        <InputNumber
          v-model="newLayout.size.x"
          :allowEmpty="false"
          variant="filled"
          showButtons
          buttonLayout="vertical"
          style="width: 3em"
          :min="1"
          :max="10"
          pt:root:class="md:text-4xl"
        />
        <i class="pi pi-times mx-2 md:text-4xl" style="aspect-ratio: 1" />
        <InputNumber
          v-model="newLayout.size.y"
          :allowEmpty="false"
          variant="filled"
          showButtons
          buttonLayout="vertical"
          style="width: 3em"
          :min="1"
          :max="10"
          pt:root:class="md:text-4xl"
        />
      </div>
      <div
        v-else-if="shape == TableShape.Circle"
        v-tooltip.top="t('create_layout.circle.size')"
      >
        <InputNumber
          v-model="newLayout.size.x"
          :allowEmpty="false"
          variant="filled"
          showButtons
          buttonLayout="vertical"
          style="width: 3em"
          :min="3"
          :max="10"
          pt:root:class="md:text-4xl"
        />
      </div>
      <Button
        :label="$t('create_layout.save')"
        icon="pi pi-check"
        severity="success"
        class="mt-5"
        @click="createTable"
      />
    </div>
  </div>
</template>

<style scoped>
#rectangular {
  border-radius: 15px;
  width: min(800px, 80vw, 80vh);
  aspect-ratio: 1;
}

#circular {
  border-radius: 50%;
  width: min(800px, 90vw, 90vh);
  aspect-ratio: 1;
}

:deep(input) {
  font-size: inherit;
}
</style>
