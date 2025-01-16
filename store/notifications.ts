import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NotificationType } from "~/types.js";

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<NotificationType[]>([]);

  const hasNotification = computed<boolean>(() => {
    return notifications.value.length > 0;
  });

  function addNotification(notification:NotificationType|string): void {
    if (typeof notification === 'string') {
      notification = {
        message: notification,
      };
    }
    if (!notification.id) notification.id = Date.now();
    notifications.value.push(notification);

    const timeout = notification?.timeout || 5000;
    setTimeout(() => removeNotification(notification.id || -1), timeout);
  }

  function removeNotification(id:number): void {
    let index: number = notifications.value.findIndex((ni:NotificationType) => ni.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  }

  return { notifications, hasNotification, addNotification, removeNotification };
});
