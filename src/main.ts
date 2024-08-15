import { createApp } from "vue";
import { router } from "./router/router";

import { i18n } from "./locales/i18n";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import "./styles/style.css";
import "primeicons/primeicons.css";
import { MyPreset } from "./styles/theme";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});
app.use(ToastService);
app.use(ConfirmationService);
app.mount("#app");
