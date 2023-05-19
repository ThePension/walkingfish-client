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
        meta: { auth: true },
      },
      {
        path: "admin/color-management",
        component: () => import("pages/ColorManagement.vue"),
        meta: { auth: true },
      },
      {
        path: "admin/add-article",
        component: () => import("pages/AddArticle.vue"),
        meta: { auth: true },
      },
      {
        path: "admin/article-management",
        component: () => import("pages/ArticleManagement.vue"),
        meta: { auth: true },
      },
      {
        path: "admin/edit-article/:id",
        component: () => import("pages/EditArticle.vue"),
        meta: { auth: true },
      },
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
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
