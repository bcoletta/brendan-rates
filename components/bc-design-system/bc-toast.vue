<script setup lang="ts">
import { useRouter } from "vue-router";
import type { NotificationType } from "~/types/types";

const $emit = defineEmits([ 'close' ]);
const { notification } = defineProps({
  notification: {
    type: Object as PropType<NotificationType>,
    default: { message: '' },
  },
});

const $router = useRouter();

const notificationClass = computed<string>(() => {
  let classStr = '';

  classStr += notification.color ? `${notification.color} ` : 'bg-slate-300 ';

  if (notification.action) classStr += 'cursor-pointer ';

  console.log('classStr', classStr);
  return classStr;
});

const onClick = () => {
  if (notification.action?.route) {
    $router.push(notification.action.route);
  }

  $emit('close', notification.id);
}
</script>

<template>
<div
  v-if="notification"
  class="p-2 mb-2 rounded border border-slate-500 shadow-md"
  :class="notificationClass"
  @click="onClick"
>
  {{ notification.message }}
</div>
</template>

<style scoped>

</style>