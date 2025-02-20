<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { InstanceofPlugin } from "wujie-polyfill";
  import { useMicroApp } from "@/hooks/useMicroApp";

  import WuJie from "wujie-vue3";

  const route = useRoute();
  const { getMicroAppHostByAppId } = useMicroApp();

  const props = {};

  const url = computed(() => getMicroAppHostByAppId(route.meta.appId) + route.path);
</script>

<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WuJie
    width="100%"
    height="100%"
    :name="route.meta.appId"
    :url="url"
    :sync="false"
    :alive="true"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  ></WuJie>
</template>
