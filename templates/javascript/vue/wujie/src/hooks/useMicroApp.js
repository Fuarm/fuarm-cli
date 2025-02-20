const microAppMap = new Map();

export const useMicroApp = () => {

  const microAppRegister = async () => {
    if (microAppMap.size > 0) return;
    try {
      const { data } = await Promise.resolve([
        {
          appId: "571e6138657b43d3ad38662fa2eb4266",
          host: "http://localhost:8080",
        },
        {
          appId: "571e6138657b43d3ad38662fa2eb4265",
          host: "http://localhost:8081",
        },
      ]);

      for (const item of data) {
        microAppMap.set(item.appId, item.host);
      }
    } catch (error) {
      microAppMap.clear();
      console.error("==微引用注册异常==", error);
    }
  }

  const getMicroAppHostByAppId = (appId) => microAppMap.get(appId);

  return {
    microAppRegister,
    getMicroAppHostByAppId,
  }
}