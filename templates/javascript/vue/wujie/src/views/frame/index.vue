<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {InstanceofPlugin} from "wujie-polyfill";
import {useMicroApp} from "@/hooks/useMicroApp";

import WuJie from "wujie-vue3";
import {useFrame} from "@/hooks/useFrame.js";

const route = useRoute();
const frame = useFrame();

const {microAppid, queryMicroAppTargetURLByAppid} = useMicroApp();

const props = {
  appid: route.meta.appid,
  routes: frame.queryRoutesByMicroAppid(microAppid.value)
};
const url = computed(() => queryMicroAppTargetURLByAppid(microAppid.value));
const wuJiePlugin = [InstanceofPlugin()];
</script>

<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WuJie
      width="100%"
      height="100%"
      :name="microAppid"
      :url="url"
      :sync="false"
      :alive="true"
      :props="props"
      :plugins="wuJiePlugin"
  />
</template>
