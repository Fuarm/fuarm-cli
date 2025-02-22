import { shallowRef } from "vue";
import { useRouter } from "vue-router";

// 存在当前页面的路由数据
const routes = shallowRef();

// 存储当前缓存页面key
const keepaliveKeyMap = new Map();

const router = useRouter();

export const useFrame = () => {
  const init = () => {
    routes.value = [];

    // 移除所有当前已注册的路由
    router.getRoutes().forEach((route) => {
      if (route.name) {
        router.removeRoute(route.name);
      }
    });
  };

  const updateRoutes = (routes) => {
    routes.value = routes;
  };

  const isNotEmptyByRoutes = () => {
    return routes.value?.length > 0;
  };

  const queryRoutesByMicroAppid = (appid) => {
    return routes.value?.filter((route) => route.appid === appid);
  };

  const updateKeepaliveKey = (key, value) => {
    keepaliveKeyMap.set(key, value);
  };

  return {
    keepaliveKeyMap,
    init,
    updateRoutes,
    isNotEmptyByRoutes,
    queryRoutesByMicroAppid,
    updateKeepaliveKey
  };
};
