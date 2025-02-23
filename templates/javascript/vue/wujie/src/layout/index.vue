<script setup>
  import { defineAsyncComponent } from "vue";
  import { useRouter } from "vue-router";
  import { useFrame } from "@/hooks/useFrame";
  import { useMicroApp } from "@/hooks/useMicroApp";

  const router = useRouter();
  const { keepaliveKeyMap } = useFrame();
  const { microAppid, registerApp, isSystemMicroApp } = useMicroApp();

  const queryMicroAppComponent = (route, appid) => {
    return [microAppid.value, route.meta.appid].includes(appid)
      ? defineAsyncComponent(() => import("@/views/frame/index.vue"))
      : null;
  };
</script>

<template>
  <div>
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
