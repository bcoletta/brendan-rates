<script setup lang="ts">
import NavBar from "~/components/nav-bar.vue";
</script>

<template>
<app-bar />
  <div class="pt-10"> <!-- Padding corresponds to app-bar height -->
    <nav-bar />
    <slot />
  </div>
</template>

<style scoped>

</style>