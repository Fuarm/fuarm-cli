import router from "@/router";

// 存在当前页面的路由数据
let routes = [];

// 存储当前缓存页面key
const keepaliveKeyMap = new Map();

const frameMap = new Map();

// 固定的Frame
const disableDeleteFrameKey = ["/Home"];

export const useFrame = () => {
  const init = () => {
    routes = [];

    // 移除所有当前已注册的路由
    router.getRoutes().forEach((route) => {
      if (route.name) {
        router.removeRoute(route.name);
      }
    });

    clearKeepaliveKey();
  };

  const updateRoutes = (_routes) => {
    routes = _routes;
  };

  const isNotEmptyByRoutes = () => {
    return routes?.length > 0;
  };

  const queryRoutesByAppid = (appid) => {
    return routes?.filter((route) => route.appid === appid);
  };

  const setKeepaliveKey = (key, value, route) => {
    if (!keepaliveKeyMap.get(key)) {
      keepaliveKeyMap.set(key, value);
      frameMap.set(key, route);
    }
  };

  const deleteKeepaliveKey = (key) => {
    if (disableDeleteFrameKey.includes(key)) return;
    keepaliveKeyMap.delete(key);
    frameMap.delete(key);
  };

  const clearKeepaliveKey = () => {
    // 临时存储禁止删除的数据
    const temp = disableDeleteFrameKey.map((key) => {
      return {
        key,
        keepaliveValue: keepaliveKeyMap.get(key),
        frameValue: frameMap.get(key)
      };
    });
    // 清空
    keepaliveKeyMap.clear();
    frameMap.clear();

    temp.forEach((item) => {
      setKeepaliveKey(item.key, item.keepaliveValue, item.frameValue);
    });
  };

  return {
    keepaliveKeyMap,
    init,
    updateRoutes,
    isNotEmptyByRoutes,
    queryRoutesByAppid,
    setKeepaliveKey,
    deleteKeepaliveKey,
    clearKeepaliveKey
  };
};
