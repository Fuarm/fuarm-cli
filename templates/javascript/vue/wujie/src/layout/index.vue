<script setup>
  import { defineAsyncComponent } from "vue";
  import { useRouter } from "vue-router";
  import { useFrame } from "@/hooks/useFrame";
  import { useMicroApp } from "@/hooks/useMicroApp";

  const router = useRouter();
  const { keepaliveKeyMap, deleteKeepaliveKey } = useFrame();
  const { microAppid, registerApp, isSystemMicroApp } = useMicroApp();

  const queryMicroAppComponent = (route, appid) => {
    return [microAppid.value, route.meta.appid].includes(appid)
      ? defineAsyncComponent(() => import("@/views/frame/index.vue"))
      : null;
  };

  const clickTest = () => {
    console.log(keepaliveKeyMap);
    deleteKeepaliveKey("WuJie_2");
  };
</script>

<template>
  <div>
    <div>布局</div>
    <div>{{ Array.from(keepaliveKeyMap.values()) }}</div>

    <button @click="router.push({ path: '/wujie_1' })">无界1</button>
    <button @click="router.push({ path: '/wujie_2' })">无界2</button>
    <button @click="router.push({ path: '/wujie_3' })">无界3</button>
    <button @click="router.push({ path: '/404' })">404</button>
    <button @click="clickTest">关闭无界2标签</button>

    <router-view v-slot="{ Component, route }">
      <template v-for="appid in registerApp" :key="appid">
        <keep-alive v-if="isSystemMicroApp(appid)">
          <component :is="Component" :key="keepaliveKeyMap.get(route.name) || route.name" />
        </keep-alive>
        <component
          :is="queryMicroAppComponent(route, appid)"
          v-else
          v-show="route.meta.appid === appid"
          :appid="appid"
        />
      </template>
    </router-view>
  </div>
</template>
