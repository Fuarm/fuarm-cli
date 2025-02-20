import { createRouter, createWebHistory } from "vue-router";
import { useRouterGuardChain } from "@/hooks/useRouterGuardChain";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
});

const guardChain = useRouterGuardChain();

router.beforeEach((to, from, next) => {
  guardChain
    .before(to, next, router)
    .dynamicRoute()
    .or()
    .invoke(next);
});

router.afterEach((to) => {
  guardChain.after(to, router).invoke(() => window.$wujie?.bus.$emit("router-after"));
});

export default router;
