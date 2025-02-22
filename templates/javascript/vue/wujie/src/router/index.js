import { createRouter, createWebHistory } from "vue-router";
import { useRouterGuardChain } from "@/hooks/useRouterGuardChain";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
});

const guardChain = useRouterGuardChain();

guardChain.init(router).microApp().progress();

router.beforeEach((to, from, next) => {
  guardChain
    .before(to, next, router)
    .progress()
    .authorization()
    .or()
    .dynamicRoute()
    .or()
    .microApp()
    .or()
    .invoke(next);
});

router.afterEach((to) => {
  guardChain.after(to, router).authorization().or().microApp().and().progress();
});

export default router;
