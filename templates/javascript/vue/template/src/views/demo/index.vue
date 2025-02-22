<script setup>
  import { ref } from "vue";

  const count = ref(0);
</script>

<template>
  <div>demo 页面2</div>

  <button @click="count++">按钮</button>
  <div>{{ count }}</div>
</template>
