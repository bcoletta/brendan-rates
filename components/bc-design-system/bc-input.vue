<script setup lang="ts">
const attrs = useAttrs();
const emit = defineEmits([ 'update:modelValue', 'blur', 'focus' ]);
const props = defineProps({
  label: String,
  labelClass: String,
  inputClass: String,
  inputType: String,
  placeholder: [String,Boolean],
});

const placeholder = computed((): string|null => {
  if (props.placeholder === false) return null;
  else if (props.placeholder) return props.placeholder;
  else if (props.label) return `Enter ${props.label}...`;
  else return 'Enter value...';
})
</script>

<template>
  <div class="input-container flex h-8 rounded-xl overflow-hidden text-neutral-800 my-4">
    <div
        v-if="props.label"
        class="label bg-orange-300 h-full px-2 flex items-center justify-end min-w-[40%] lg:min-w-[25%] flex-shrink-0 font-medium"
    >{{ props.label }}</div>
    <slot>
      <input
          class="bg-sky-100 w-full px-1"
          :type="props.inputType || 'text'"
          :placeholder="placeholder"
          :value="attrs.modelValue"
          @blur="emit('blur', $event)"
          @focus="emit('focus', $event)"
          @input="emit('update:modelValue', $event.target.value)"
      />
    </slot>
  </div>
</template>

<style scoped>
</style>