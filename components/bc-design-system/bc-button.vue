<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
  text: String,
  variant: String,
});

const internalType = computed((): string => {
  const acceptedTypes: string[] = [ 'primary', 'secondary', 'tertiary', 'text' ];

  if (!props.variant || !acceptedTypes.includes(props.variant)) return 'tertiary';

  return props.variant;
});

const internalClass = computed((): string => {
  const defaultClasses: string = 'h-8 rounded font-medium px-2';

  switch (internalType.value) {
    case 'primary':
      return `${defaultClasses} bg-orange-300 text-neutral-800`;
    case 'secondary':
      return `${defaultClasses} bg-slate-300 border border-orange-300 text-neutral-800`;
    case 'tertiary':
      return `${defaultClasses} bg-slate-300 text-neutral-800`;
    case 'text':
      return `${defaultClasses} underline`;
    default:
      return defaultClasses;
  }
});

const slotSpanClass = computed((): string => {
  return internalType.value !== 'text' ? 'px-4' : '';
});
</script>

<template>
  <button :class="internalClass" :disabled="props.disabled">
    <slot>
      <span :class="slotSpanClass">{{ props.text }}</span>
    </slot>
  </button>
</template>

<style scoped>
button:disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>