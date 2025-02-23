import createChain from "@/utils/createChain";

import { useFrame } from "@/hooks/useFrame";
import { getMenuList } from "@/api";

const frame = useFrame();

// 动态路由
const dynamicRouteHandler = () => {
  const importModules = import.meta.glob("../views/**");

  const createRoute = (item) => {
    return {
      path: "/" + item.code.toLowerCase(),
      name: item.code,
      meta: {
        title: item.name,
        appid: item.appid
      },
      component: importModules[`../${item.component}`]
    };
  };

  const before = (to, next, router) => {
    if (router.hasRoute(to.name)) {
      return true;
    }

    if (frame.isNotEmptyByRoutes()) {
      return next({ name: "Layout" });
    }

    console.log(
      "%c==%s dynamicRouteHandler before==",
      "color: green; font-weight: bold; line-height: 1.8;",
      window.$wujie?.props.appid || "",
      to
    );
    (async () => {
      let isRedirect = false;
      // 案例：菜单管理路由
      const dynamicRoutes = frame.queryRoutesByParent() || (await getMenuList());
      frame.updateRoutes(dynamicRoutes);

      dynamicRoutes?.forEach((dynamicRoute) => {
        if (dynamicRoute.code.toLowerCase() === to.path.replace(/\//, "")) {
          isRedirect = true;
        }
        router.addRoute(
          ...[dynamicRoute.layout, createRoute(dynamicRoute)].filter((item) => !!item)
        );
      });

      return isRedirect ? next({ ...to, replace: true }) : next({ name: "Layout" });
    })();
  };

  return {
    before
  };
};

export const useRouterGuardChain = () => {
  const { instance: chain } = createChain();

  const _dynamicRouteHandler = dynamicRouteHandler();

  let invoke = null;

  chain.before = function (to, next, router) {
    chain.invoke(() => {
      invoke = (handler) => handler["before"]?.(to, next, router);
      return true;
    });
    return this;
  };

  chain.after = function (to, router) {
    chain.invoke(() => {
      invoke = (handler) => handler["after"]?.(to, router);
      return true;
    });
    return this;
  };

  chain.dynamicRoute = function () {
    chain.invoke(() => invoke(_dynamicRouteHandler));
    return this;
  };

  return chain;
};
