<script setup lang="ts">
import BcLink from "~/components/bc-design-system/bc-link.vue";
</script>

<template>
  <div class="m-4 grid grid-cols-2 gap-4">
    <bc-link text="Home" to="/" router />
    <bc-link text="Collection" to="/collection" router />
  </div>
</template>

<style scoped>

</style>