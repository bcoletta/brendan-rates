<script setup lang="ts">
import BcInput from "~/components/bc-design-system/bc-input.vue";
import type { PropItem } from "~/types";

interface InternalSelectItem {
  text: string;
  value: string|number;
}

const attrs = useAttrs();
const emit = defineEmits([ 'update:modelValue' ]);
const props = defineProps({
  items: Array,
});

const internalItems = computed((): InternalSelectItem[] => {
  return props.items.map((item:PropItem|string|number) => {
    if (typeof item === 'object') {
      if (!Object.hasOwn(item, 'value')) return { text: '', value: undefined };

      let returnObj: PropItem = { text: '', value: item.value };
      returnObj.text = Object.hasOwn(item, 'text') ? item.text : <string>item.value;
      return returnObj;
    } else {
      return { text: <string>item, value: item };
    }
  });
});

const onInput = (event: Event): void => {
  let newVal: string|number = (event.target as HTMLInputElement).value;
  const isInteger: boolean = /^\d+$/.test(newVal);

  if (isInteger) newVal = parseInt(newVal);

  emit('update:modelValue', newVal);
}
</script>

<template>
  <bc-input label="Title">
    <select
        class="text-neutral-800 bg-sky-100 w-full h-8 rounded-r-xl"
        :value="attrs.modelValue"
        @input="onInput"
    >
      <option v-for="item in internalItems" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </bc-input>
</template>

<style scoped>

</style>