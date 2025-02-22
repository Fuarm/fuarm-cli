// 模拟菜单列表
export const getMenuList = () => {
  return Promise.resolve([
    {
      id: 1,
      code: "Demo",
      name: "主应用demo页",
      layout: "Layout",
      component: "views/demo/index.vue"
    },
    {
      id: 2,
      code: "WuJie_1",
      name: "无界微应用A Demo页面",
      layout: "Layout",
      component: "views/demo/index.vue",
      appid: "571e6138657b43d3ad38662fa2eb4266"
    },
    {
      id: 3,
      code: "WuJie_2",
      name: "无界微应用A Demo页面",
      layout: "Layout",
      component: "views/demo/index.vue",
      appid: "571e6138657b43d3ad38662fa2eb4265"
    }
  ]);
};
