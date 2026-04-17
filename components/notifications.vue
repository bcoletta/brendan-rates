<script setup lang="ts">
import BcToast from "~/components/bc-design-system/bc-toast.vue";
import { useNotificationStore } from "~/store/notifications";
import { useRouter } from 'vue-router';
import type { NotificationType } from '~/components/bc-design-system/types';

const $router = useRouter();
const $store = useNotificationStore();

const closeToast = (id:number): void => {
  const notification: NotificationType|undefined = $store.getNotification(id);

  $store.removeNotification(id);

  if (notification?.action?.route) $router.push(notification.action.route);
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