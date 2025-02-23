<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();
  window.$wujie?.bus.$on(`router-change:${window.$wujie?.props.appid || ""}`, (path) => {
    router.push({ path });
  });
</script>

<template>
  <div>
    <div>布局222</div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
