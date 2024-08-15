<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useI18n } from "vue-i18n";
import { TableLayout, TableShape } from "../../classes/TableLayout";
const router = useRouter();
const { t } = useI18n();
const toast = useToast();
const confirm = useConfirm();

const layouts = ref<Array<TableLayout>>([]);
onMounted(() => {
  try {
    let storage = localStorage.getItem("tables_layout");
    if (storage) {
      layouts.value = JSON.parse(storage);
    }
  } catch (_) {
    toast.add({
      severity: "error",
      summary: t("load_layout.data_corrupted.summary"),
      detail: t("load_layout.data_corrupted.detail"),
      closable: false,
      life: 5000,
    });
  }
});

function deleteLayout(layoutId: string) {
  layouts.value = layouts.value.filter((layout) => layout.id != layoutId);
  localStorage.setItem("tables_layout", JSON.stringify(layouts.value));
}

function confirmDeletion(event: MouseEvent, layout: TableLayout) {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: t("delete_layout.message", { name: layout.name }),
    icon: "pi pi-info-circle",
    rejectProps: {
      label: t("cancel"),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: t("delete"),
      severity: "danger",
    },
    accept: () => deleteLayout(layout.id),
  });
}
</script>

<template>
  <div class="flex justify-content-center align-items-center h-full">
    <div
      v-if="layouts.length == 0"
      class="md:text-2xl font-bold border-round-xl p-3"
      style="background-color: var(--p-primary-color)"
    >
      {{ t("load_layout.empty") }}
    </div>
    <div v-else class="flex flex-column max-h-full">
      <div v-for="layout in layouts" class="relative">
        <Button
          class="delete"
          rounded
          severity="danger"
          icon="pi pi-trash"
          @click="(event) => confirmDeletion(event, layout)"
        />
        <Toolbar
          class="m-3 border-none"
          pt:root:class="flex-nowrap"
          pt:center:class="overflow-hidden"
        >
          <template #start
            ><div
              class="poker-table flex justify-content-center align-items-center justify text-white"
              :id="
                layout.shape == TableShape.Rectangle
                  ? 'rectangular'
                  : 'circular'
              "
            >
              {{ layout.size.x }}
              {{
                layout.shape == TableShape.Rectangle ? "x " + layout.size.y : ""
              }}
            </div></template
          >
          <template #center
            ><span
              class="text-3xl overflow-hidden text-overflow-ellipsis white-space-nowrap font-bold"
              style="color: var(--p-button-primary-color)"
              >{{ layout.name }}</span
            ></template
          >
          <template #end
            ><Button
              :label="t('load_layout.load')"
              severity="success"
              raised
              @click="router.push({ name: 'play', query: { id: layout.id } })"
          /></template>
        </Toolbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete {
  position: absolute;
  right: 0;
}
.p-toolbar {
  width: min(600px, 90vw);
  background-color: var(--p-button-primary-background);
}
#rectangular {
  border-radius: 10px;
  width: 64px;
  aspect-ratio: 1;
}

#circular {
  border-radius: 50%;
  width: 64px;
  aspect-ratio: 1;
}
</style>
