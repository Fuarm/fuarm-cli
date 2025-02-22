import { shallowRef } from "vue";

// 存在当前页面的路由数据
const routes = shallowRef();

export const useFrame = () => {
  const init = () => {
    routes.value = [];
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

  return {
    init,
    updateRoutes,
    isNotEmptyByRoutes,
    queryRoutesByMicroAppid
  };
};
