const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        alias: ["/index", "/home"],
        component: () => import("pages/IndexPage.vue"),
      },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      {
        path: "catalog",
        component: () => import("pages/CatalogPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
