<script setup lang="ts">
import BcButton from "~/components/bc-design-system/bc-button.vue";

const props = defineProps({
  disabled: Boolean,
  router: Boolean,
  text: String,
  to: String,
  type: String,
});

const route = useRoute();
const isActiveRoute = computed((): boolean => route.path === props.to);

const type = computed((): string => {
  if (props.type) return props.type;

  return isActiveRoute.value ? 'primary' : 'secondary';
});

const isDisabled = computed((): boolean => {
  return props.disabled || (props.router && isActiveRoute.value);
});
</script>

<template>
  <bc-button :variant="type" :disabled="isDisabled">
    <NuxtLink :to="props.to" class="px-4 w-full flex justify-center">{{ props.text }}</NuxtLink>
  </bc-button>
</template>

<style scoped>

</style>