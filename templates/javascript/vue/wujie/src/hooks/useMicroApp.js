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

  const getMicroAppHostByAppid = (appid) => microAppMap.get(appid)?.host || "";

  const isSystemMicroApp = (appid) => microAppMap.get(appid)?.code === "FRAME";

  return {
    microAppid,
    microAppRegister,
    getMicroAppHostByAppid,
    isSystemMicroApp
  };
};
