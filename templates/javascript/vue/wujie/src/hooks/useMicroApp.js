import { ref } from "vue";

import { getMicroAppList } from "@/api";

const microAppMap = new Map();
const microAppid = ref(null);
let frameMicroAppid = null;

export const useMicroApp = () => {
  const microAppRegister = async () => {
    if (microAppMap.size > 0) return;
    try {
      const data = await getMicroAppList();

      for (const item of data) {
        microAppMap.set(item.appid, item);
        if (item.code === "FRAME") {
          frameMicroAppid = item.appid;
        }
      }
    } catch (error) {
      microAppMap.clear();
      console.error("==微引用注册异常==", error);
    }
  };

  const isSystemMicroApp = (appid) => !appid || frameMicroAppid === appid;

  const isEmptyMicroAppid = () => {
    return !microAppid.value;
  };

  const isFirstLoadedByAppid = (appid) => {
    return !microAppMap.get(appid)?._route;
  };

  const updateMicroAppid = (appid) => {
    microAppid.value = isSystemMicroApp(appid) ? frameMicroAppid : appid;
  };

  const updateMicroAppTargetRoute = (to) => {
    if (!to.meta.appid) return;
    microAppMap.set(to.meta.appid, {
      ...microAppMap.get(to.meta.appid),
      _route: to
    });
  };

  const queryMicroAppTargetURLByAppid = (appid) => {
    const microAppInfo = microAppMap.get(appid);
    return (microAppInfo?.host || "") + (microAppInfo?._route?.path || "");
  };

  return {
    microAppid,
    microAppMap,
    microAppRegister,
    isSystemMicroApp,
    isEmptyMicroAppid,
    isFirstLoadedByAppid,
    updateMicroAppid,
    updateMicroAppTargetRoute,
    queryMicroAppTargetURLByAppid
  };
};
