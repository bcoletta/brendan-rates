<script setup lang="ts">
import BcToast from "~/components/bc-design-system/bc-toast.vue";
import { useNotificationStore } from "~/store/notifications";

const $store = useNotificationStore();

const closeToast = (id:number): void => {
  $store.removeNotification(id);
}
</script>

<template>
  <div v-if="$store.hasNotification" class="absolute top-4 sm:right-4 z-20">
    <bc-toast
      v-for="n in $store.notifications"
      :key="n.id"
      :notification="n"
      @close="closeToast"
    />
  </div>
</template>

<style scoped>

</style>