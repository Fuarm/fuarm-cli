const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue")
  },
  {
    //通配符添加404页面，解决刷新浏览器报警告 No match found for location with path
    hide: true,
    path: "/:pathMatch(.*)*",
    component: () => import(/* webpackChunkName: "temp" */ "@/views/error/404.vue")
  }
];

export default routes;
