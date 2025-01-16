<template>
  <notifications />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useUtilStore } from "~/store/utils";

const $utils = useUtilStore();

onMounted(() => {
  $utils.setActiveBreakpoint();
  window.addEventListener('resize', $utils.setActiveBreakpoint);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', $utils.setActiveBreakpoint);
});
</script>

<style lang="scss">
@use "~/assets/css/tailwind.css";
</style>
