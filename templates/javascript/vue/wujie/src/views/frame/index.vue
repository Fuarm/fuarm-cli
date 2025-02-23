<script setup>
  import { computed, useAttrs } from "vue";
  import { InstanceofPlugin } from "wujie-polyfill";
  import { useMicroApp } from "@/hooks/useMicroApp";

  import WuJie from "wujie-vue3";
  import { useFrame } from "@/hooks/useFrame.js";

  const attrs = useAttrs();
  const frame = useFrame();
  const { queryMicroAppTargetURLByAppid } = useMicroApp();

  const props = {
    appid: attrs.appid,
    routes: frame.queryRoutesByAppid(attrs.appid)
  };
  const url = computed(() => queryMicroAppTargetURLByAppid(attrs.appid));
  const wuJiePlugin = [InstanceofPlugin()];
</script>

<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WuJie
    width="100%"
    height="100%"
    :name="attrs.appid"
    :url="url"
    :sync="false"
    :alive="true"
    :props="props"
    :plugins="wuJiePlugin"
  />
</template>
