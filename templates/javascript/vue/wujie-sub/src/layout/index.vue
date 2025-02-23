<script setup>
  import { useRouter } from "vue-router";
  import { computed } from "vue";

  const router = useRouter();
  window.$wujie?.bus.$on(`router-change:${window.$wujie?.props.appid || ""}`, (path) => {
    router.push({ path });
  });

  const keepaliveKeyMap = computed(() => window.$wujie?.props.keepaliveKeyMap);
</script>

<template>
  <div>
    <div>布局222</div>

    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="keepaliveKeyMap?.get(route.name)" />
      </keep-alive>
    </router-view>
  </div>
</template>
