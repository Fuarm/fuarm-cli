<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const keepaliveKeyMap = computed(() => window.$wujie?.props.keepaliveKeyMap);

  window.$wujie?.bus.$on(`router-change:${window.$wujie?.props.appid || ""}`, (path) => {
    router.push({ path });
  });
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
