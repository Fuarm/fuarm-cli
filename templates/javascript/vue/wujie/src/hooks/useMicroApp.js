const microAppMap = new Map();

export const useMicroApp = () => {

  const microAppRegister = async () => {
    if (microAppMap.size > 0) return;
    try {
      const data = await Promise.resolve([
        {
          appid: "571e6138657b43d3ad38662fa2eb4266",
          host: "http://localhost:8080",
        },
      ]);

      for (const item of data) {
        microAppMap.set(item.appid, item.host);
      }

    } catch (error) {
      microAppMap.clear();
      console.error("==微引用注册异常==", error);
    }
  }

  const getMicroAppHostByAppid = (appid) => microAppMap.get(appid);

  return {
    microAppRegister,
    getMicroAppHostByAppid,
  }
}