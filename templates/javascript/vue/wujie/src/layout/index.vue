<script setup>
  import { computed, defineAsyncComponent } from "vue";
  import { useRouter } from "vue-router";
  import { useFrame } from "@/hooks/useFrame.js";
  import { useMicroApp } from "@/hooks/useMicroApp.js";

  const router = useRouter();
  const { keepaliveKeyMap } = useFrame();
  const { microAppid } = useMicroApp();

  const MicroAppComponent = computed(() => {
    return microAppid.value ? defineAsyncComponent(() => import("@/views/frame/index.vue")) : null;
  });
</script>

<template>
  <div>
    <div>布局</div>
    <div>{{ Array.from(keepaliveKeyMap.values()) }}</div>

    <button @click="router.push({ path: '/wujie_1' })">无界1</button>
    <button @click="router.push({ path: '/wujie_2' })">无界2</button>
    <button @click="router.push({ path: '/wujie_3' })">无界3</button>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="Array.from(keepaliveKeyMap.values())">
        <component :is="Component" :key="keepaliveKeyMap.get(route.name) || route.name" />
      </keep-alive>

      <component :is="MicroAppComponent" v-show="!Component" />
    </router-view>
  </div>
</template>
