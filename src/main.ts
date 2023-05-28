import * as VueRouter from "vue-router";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory("/sharer/"),
  routes: [
    { path: "/", component: () => import("./views/Home.vue") },
    { path: "/share", component: () => import("./views/Share.vue") }
  ]
});

const app = createApp(App);
app.use(router);
app.mount("#app");
