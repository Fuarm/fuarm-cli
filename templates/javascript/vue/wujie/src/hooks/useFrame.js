import router from "@/router/index.js";

// 存在当前页面的路由数据
let routes = [];

// 存储当前缓存页面key
const keepaliveKeyMap = new Map();

export const useFrame = () => {
  const init = () => {
    routes = [];

    // 移除所有当前已注册的路由
    router.getRoutes().forEach((route) => {
      if (route.name) {
        router.removeRoute(route.name);
      }
    });
  };

  const updateRoutes = (_routes) => {
    routes = _routes;
  };

  const isNotEmptyByRoutes = () => {
    return routes?.length > 0;
  };

  const queryRoutesByMicroAppid = (appid) => {
    return routes?.filter((route) => route.appid === appid);
  };

  const setKeepaliveKey = (key, value) => {
    if (!keepaliveKeyMap.get(key)) {
      keepaliveKeyMap.set(key, value);
    }
  };

  return {
    keepaliveKeyMap,
    init,
    updateRoutes,
    isNotEmptyByRoutes,
    queryRoutesByMicroAppid,
    setKeepaliveKey
  };
};
