import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";
import DashBoardView from "../views/DashBoardView.vue";
import Overview from "../views/dashboard/Overview.vue";
import Savings from "../views/dashboard/Savings.vue";
import Rewards from "../views/dashboard/Rewards.vue";
import Leaderboards from "../views/dashboard/Leaderboards.vue";
import Wallets from "../views/dashboard/Wallets.vue";
import ErrorView from "../views/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/dashboard",
      component: DashBoardView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          component: Overview,
        },
        {
          path: "savings",
          component: Savings,
        },
        {
          path: "quest",
          component: () => import("@/views/dashboard/Quest.vue"),
        },
        {
          path: "quest/:id", 
          component: () => import("@/views/dashboard/QuestDetail.vue"),
          props: true, 
        },
        {
          path: "leaderboards",
          component: Leaderboards,
        },
        {
          path: "rewards",
          component: Rewards,
        },
        {
          path: "wallets",
          component: Wallets,
        },
      ],
    },
    // Error routes
    {
      path: "/404",
      name: "error",
      component: ErrorView
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404"
    }
  ],
});

// Add navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/auth");
  } else if (to.path === "/auth" && token) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
