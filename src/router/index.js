import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
import Page from "./../views/Page.vue";
import Article from "./../views/Article.vue";
import Realisation from "./../views/Realisation.vue";
import Competence from "./../views/Competence.vue";
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
  {
    path: "/Realisation",
    name: "Realisation",
    component: Realisation,
    props: true,
  },
  {
    path: "/Competence",
    name: "Competence",
    component: Competence,
    props: true,
  },
];

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
  history: createWebHashHistory(),
  routes,
});

export default router;
