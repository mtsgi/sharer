import { createApp } from "vue";
import "./style.css";
import "@mdi/font/css/materialdesignicons.min.css";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: {
      rounded: "lg"
    }
  }
});

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
