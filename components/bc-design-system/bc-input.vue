<script setup lang="ts">
import { debounce as _debounce } from 'lodash';

const attrs = useAttrs();
const $emit = defineEmits([ 'update:modelValue', 'blur', 'focus' ]);
const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-orange-300',
  },
  debounce: {
    type: Number,
    default: 0,
  },
  label: String,
  labelClass: String,
  inputClass: String,
  inputType: String,
  placeholder: [String,Boolean],
});

const internalLabelClass = computed<string>(() => {
  return `${props.bgColor} ${props.labelClass}`;
});

const placeholder = computed((): string|undefined => {
  if (props.placeholder === false) return undefined;
  else if (props.placeholder) return <string>props.placeholder;
  else if (props.label) return `Enter ${props.label}...`;
  else return 'Enter value...';
});

const input = _debounce((val:string) => {
  $emit('update:modelValue', val);
}, props.debounce);
</script>

<template>
  <div class="input-container flex h-8 rounded-xl overflow-hidden text-neutral-800 my-4">
    <div
        v-if="props.label"
        class="label h-full px-2 flex items-center justify-end min-w-[40%] lg:min-w-[25%] flex-shrink-0 font-medium"
        :class="internalLabelClass"
    >{{ props.label }}</div>
    <slot>
      <input
          class="bg-sky-100 w-full px-1"
          :class="inputClass"
          :type="props.inputType || 'text'"
          :placeholder="placeholder"
          :value="attrs.modelValue"
          @blur="$emit('blur', $event)"
          @focus="$emit('focus', $event)"
          @input="input(($event.target as HTMLInputElement).value)"
      />
    </slot>
  </div>
</template>

<style scoped>
</style>