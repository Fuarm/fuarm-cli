<script setup>
  // import { useRouter } from "vue-router";
  //
  // const router = useRouter();
  // window.$wujie?.bus.$on("router-change", (to) => {
  //   router.push(to);
  // });
</script>

<template>
  <div>
    <div>布局</div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
