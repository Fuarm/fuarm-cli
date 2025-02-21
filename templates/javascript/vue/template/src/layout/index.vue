<script setup></script>

<template>
  <div>
    <div>布局</div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>