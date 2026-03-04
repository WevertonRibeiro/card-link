import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout.vue";
import NotFound from "@/pages/public/NotFound.vue";

import Login from "@/pages/public/Login.vue";
import Register from "@/pages/public/Register.vue";
import Home from "@/pages/public/Home.vue";

import MyAccount from "@/pages/protected/MyAccount.vue";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: "/",
    name: "Homepage",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/",
    name: "Account",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/my-account",
        name: "MyAccount",
        component: MyAccount,
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return "/auth/login";
  }

  if ((to.path === "/auth/login" || to.path === "/auth/register") && token) {
    return "/";
  }

  return true;
});

export default router;
