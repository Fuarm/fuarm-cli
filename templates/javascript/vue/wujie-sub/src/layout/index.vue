<script setup>
  import { useRouter } from "vue-router";
  import { reactive } from "vue";

  const router = useRouter();

  const keepaliveKeyMap = reactive(new Map(window.$wujie?.props.keepaliveKeyMap));

  window.$wujie?.bus.$on(
    `router-change:${window.$wujie?.props.appid || ""}`,
    (path, name, value) => {
      keepaliveKeyMap.set(name, value);
      router.push({ path });
    }
  );
</script>

<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="keepaliveKeyMap?.get(route.name)" />
      </keep-alive>
    </router-view>
  </div>
</template>
