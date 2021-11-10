import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
import Page from "./../views/Page.vue";
const routes = [
  {
    path: "/",
    name: Home,
    component: Home,
  },
  {
    path: "/Page",
    name: "Page",
    component: Page,
    props: true,
  },
  {
    path: "/Article",
    name: "Article",
    component: Article,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
