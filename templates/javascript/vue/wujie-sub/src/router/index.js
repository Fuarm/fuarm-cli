import { createRouter, createWebHistory } from "vue-router";
import { useRouterGuardChain } from "@/hooks/useRouterGuardChain";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
});

const guardChain = useRouterGuardChain();

router.beforeEach((to, from, next) => {
  guardChain.before(to, next, router).dynamicRoute().or().invoke(next);
});

router.afterEach((to) => {
  guardChain.after(to, router).invoke(() => {
    console.log(
      "%c==%s Invoke Router after==",
      "color: green; font-weight: bold; line-height: 1.8;",
      window.$wujie?.props.appid || "",
      to
    );
    window.$wujie?.bus.$emit("router-after");
  });
});

export default router;
