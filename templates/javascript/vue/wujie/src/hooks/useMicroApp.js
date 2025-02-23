import { ref } from "vue";

import { getMicroAppList } from "@/api";

const microAppMap = new Map();
const microAppid = ref(null);

export const useMicroApp = () => {
  const microAppRegister = async () => {
    if (microAppMap.size > 0) return;
    try {
      const data = await getMicroAppList();

      for (const item of data) {
        microAppMap.set(item.appid, item);
      }
    } catch (error) {
      microAppMap.clear();
      console.error("==微引用注册异常==", error);
    }
  };

  const isSystemMicroApp = (appid) => microAppMap.get(appid)?.code === "FRAME";

  const updateMicroAppid = (appid) => {
    microAppid.value = isSystemMicroApp(appid) ? null : appid;
  };

  const updateMicroAppTargetRoute = (to) => {
    if (!to.meta.appid) return;
    microAppMap.set(to.meta.appid, {
      ...microAppMap.get(to.meta.appid),
      route: to
    });
  };

  const isEqualByAppid = (appid) => {
    return microAppid.value === appid;
  };

  const queryMicroAppTargetURLByAppid = (appid) => {
    const microAppInfo = microAppMap.get(appid);
    return (microAppInfo?.host || "") + (microAppInfo?.route?.path || "");
  };

  return {
    microAppid,
    microAppRegister,
    isSystemMicroApp,
    updateMicroAppid,
    isEqualByAppid,
    updateMicroAppTargetRoute,
    queryMicroAppTargetURLByAppid
  };
};
