const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        alias: ["/index", "/home"],
        component: () => import("pages/HomePage.vue"),
      },
      {
        path: "about",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        path: "catalog",
        component: () => import("pages/CatalogPage.vue"),
      },
      {
        path: "admin",
        component: () => import("pages/AdminPage.vue"),
      },
      {
        path: "color-management",
        component: () => import("pages/ColorManagement.vue"),
      },
      {
        path: "add-article",
        component: () => import("pages/AddArticle.vue"),
      },
      {
        path: "article-management",
        component: () => import("pages/ArticleManagement.vue"),
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
