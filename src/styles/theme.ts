import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{stone.50}",
      100: "{stone.100}",
      200: "{stone.200}",
      300: "{stone.300}",
      400: "{stone.400}",
      500: "{stone.500}",
      600: "{stone.600}",
      700: "{stone.700}",
      800: "{stone.800}",
      900: "{stone.900}",
      950: "{stone.950}",
    },
  },
  components: {
    button: {
      colorScheme: {
        light: {
          success: {
            background: "{green.700}",
            borderColor: "{green.700}",
          },
        },
        dark: {
          success: {
            background: "{green.600}",
            borderColor: "{green.600}",
          },
        },
      },
    },
  },
});
