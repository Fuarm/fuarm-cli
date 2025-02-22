import topbar from "topbar";
import WuJie from "wujie-vue3";

import createChain from "@/utils/createChain";
import { useMicroApp } from "@/hooks/useMicroApp";
import { getMenuList } from "@/api/index.js";

const { microAppRegister } = useMicroApp();

// 进度条
const progressHandler = () => {
  const init = () => {
    WuJie.bus.$on("router-after", () => {
      topbar.hide();
    });
  };

  const before = () => {
    topbar.show();
  };

  const after = () => {
    topbar.hide();
  };

  return {
    init,
    before,
    after
  };
};

// 鉴权
const authorizationHandler = () => {
  const whiteList = ["Login"];

  const before = (to, next) => {
    console.log("==authorizationHandler before==", to);
    if (whiteList.indexOf(to.name) > -1) {
      return next();
    }
    return true;
  };

  const after = (to) => {
    console.log("==authorizationHandler after==", to);
    return whiteList.indexOf(to.name) === -1;
  };

  return {
    before,
    after
  };
};

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
      component: item.appid
        ? () => import("@/views/frame/index.vue")
        : importModules[`../${item.component}`]
    };
  };

  const before = (to, next, router) => {
    // TODO: 获取存储的动态路由的数据，如果存在 return true
    if (router.hasRoute(to.name)) {
      return true;
    }

    console.log("==dynamicRouteHandler before==", to);
    (async () => {
      // 注册微应用
      await microAppRegister();

      let isRedirect = false;
      // 案例：菜单管理路由
      const dynamicRoutes = await getMenuList();

      // TODO：存储动态路由数据
      dynamicRoutes?.forEach((dynamicRoute) => {
        if (dynamicRoute.code.toLowerCase() === to.path.replace(/\//, "")) {
          isRedirect = true;
        }
        router.addRoute(
          ...[dynamicRoute.layout, createRoute(dynamicRoute)].filter(
            (item) => !!item
          )
        );
      });

      return isRedirect
        ? next({ ...to, replace: true })
        : next({ name: "Layout" });
    })();
  };

  return {
    before
  };
};

export const useRouterGuardChain = () => {
  const { instance: chain } = createChain();

  const _progressHandler = progressHandler();
  const _authorizationHandler = authorizationHandler();
  const _dynamicRouteHandler = dynamicRouteHandler();

  let invoke = null;

  chain.init = function (router) {
    chain.invoke(() => {
      invoke = (handler) => handler["init"]?.(router);
      return true;
    });
    return this;
  };

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

  chain.progress = function () {
    chain.invoke(() => invoke(_progressHandler));
    return this;
  };

  chain.authorization = function () {
    chain.invoke(() => invoke(_authorizationHandler));
    return this;
  };

  chain.dynamicRoute = function () {
    chain.invoke(() => invoke(_dynamicRouteHandler));
    return this;
  };

  return chain;
};
