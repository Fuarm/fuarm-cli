import topbar from "topbar";

import createChain from "@/utils/createChain";

// 进度条
const progressHandler = () => {
  const before = () => {
    topbar.show();
  };

  const after = () => {
    topbar.hide();
  };

  return {
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
        moduleId: item.moduleId,
      },
      component: importModules[`../${item.component}`],
    }
  }

  const before = (to, next, router) => {
    if (router.hasRoute(to.name)) {
      return true;
    }

    console.log("==dynamicRouteHandler before==", to);
    // TODO: 添加动态路由逻辑
    setTimeout(() => {
      let isRedirect = false;
      // 案例：菜单管理路由
      const dynamicRoutes = [
        {
          id: 1,
          code: "error",
          name: "404页面",
          layout: "",
          component: "views/error/404.vue",
        },
        {
          id: 2,
          code: "404",
          name: "404页面",
          layout: "Layout",
          component: "views/error/404.vue",
        }
      ];

      dynamicRoutes?.forEach(dynamicRoute => {
        if (dynamicRoute.code.toLowerCase() === to.path.replace(/\//, "")) {
          isRedirect = true;
        }
        router.addRoute(...[dynamicRoute.layout, createRoute(dynamicRoute)].filter(item => !!item));
      });

      return isRedirect ? next({ ...to, replace: true }) : next({ name: "Layout" });
    }, 2000);
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
