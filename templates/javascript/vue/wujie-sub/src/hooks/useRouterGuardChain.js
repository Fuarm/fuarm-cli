import createChain from "@/utils/createChain";

// 动态路由
const dynamicRouteHandler = () => {
  const importModules = import.meta.glob("../views/**");

  const createRoute = (item) => {
    return {
      path: "/" + item.code.toLowerCase(),
      name: item.code,
      meta: {
        title: item.name,
        appid: item.appid,
      },
      component: importModules[`../${item.component}`],
    }
  }

  const before = (to, next, router) => {
    // TODO: 获取存储的动态路由的数据，如果存在 return true
    if (router.hasRoute(to.name)) {
      return true;
    }

    console.log("==MicroApp dynamicRouteHandler before==", to);
    (async () => {
      // TODO: 添加动态路由逻辑
      // 案例：菜单管理路由
      const dynamicRoutes = await Promise.resolve([
        {
          id: 1,
          code: "error",
          name: "404页面",
          layout: "",
          component: "views/error/404.vue",
        },
        {
          id: 2,
          code: "WuJie_1",
          name: "无界微应用A",
          layout: "Layout",
          component: "views/error/404.vue",
          appid: "571e6138657b43d3ad38662fa2eb4266"
        }
      ]);

      // TODO：存储动态路由数据
      dynamicRoutes
          ?.filter(dynamicRoute => dynamicRoute.appid === window.$wujie?.props.appid)
          ?.forEach(dynamicRoute => {
            router.addRoute(...[dynamicRoute.layout, createRoute(dynamicRoute)].filter(item => !!item));
          });

      return next({...to, replace: true});
    })();
  }

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
