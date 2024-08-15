import { createWebHistory, createRouter, RouteLocation } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CreateView from "../views/Create/CreateView.vue";
import CreateTableView from "../views/Create/CreateTableView.vue";
import LoadView from "../views/Load/LoadView.vue";
import GameView from "../views/Play/GameView.vue";

const routes = [
  { name: "home", path: "/", component: HomeView },
  { name: "create_layout", path: "/create", component: CreateView },
  {
    name: "create_table",
    path: "/create/:shape(rectangle|circle)",
    props: true,
    component: CreateTableView,
  },
  {
    name: "play",
    path: "/play",
    props: (route: RouteLocation) => ({
      id: route.query.id,
    }),
    component: GameView,
  },
  { name: "load_layout", path: "/load", component: LoadView },
  { path: "/:catchAll(.*)", redirect: { name: "home", params: {} } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
