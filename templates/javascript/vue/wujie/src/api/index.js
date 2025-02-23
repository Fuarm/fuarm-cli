// 模拟菜单列表
export const getMenuList = () => {
  return Promise.resolve([
    {
      id: 1,
      code: "Demo",
      name: "主应用demo页",
      layout: "Layout",
      component: "views/demo/index.vue",
      appid: "571e6138657b43d3ad38662fa2eb4266"
    },
    {
      id: 2,
      code: "WuJie_1",
      name: "无界微应用A Demo页面",
      layout: "Layout",
      component: "views/demo/index.vue",
      appid: "571e6138657b43d3ad38662fa2eb4264"
    },
    {
      id: 3,
      code: "WuJie_3",
      name: "无界微应用A Demo页面-3",
      layout: "Layout",
      component: "views/error/404.vue",
      appid: "571e6138657b43d3ad38662fa2eb4265"
    },
    {
      id: 4,
      code: "WuJie_2",
      name: "无界微应用A Demo页面",
      layout: "Layout",
      component: "views/demo/index.vue",
      appid: "571e6138657b43d3ad38662fa2eb4265"
    }
  ]);
};

// 模拟应用注册列表
export const getMicroAppList = () => {
  return Promise.resolve([
    {
      name: "主应用-系统模块",
      code: "FRAME",
      appid: "571e6138657b43d3ad38662fa2eb4266",
      host: null
    },
    {
      name: "子应用-经租模块",
      code: "LEASE",
      appid: "571e6138657b43d3ad38662fa2eb4264",
      host: "http://localhost:4173"
    },
    {
      name: "子应用-其他模块",
      code: "OTHER",
      appid: "571e6138657b43d3ad38662fa2eb4265",
      host: "http://localhost:5174"
    }
  ]);
};
