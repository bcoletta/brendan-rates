<script setup lang="ts">
import { debounce } from 'lodash';
import type { DropdownItem } from "~/types";
import BcInput from "~/components/bc-design-system/bc-input.vue";

const emit = defineEmits([ 'select', 'select:value', 'update:search' ]);
const props = defineProps({
  items: Array as PropType<DropdownItem[]>,
  label: String,
  noDataMessage: {
    type: String,
    default: 'No Results'
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
  searchFunction: {
    type: Function,
    default: () => {},
  },
  value: [String,Number],
});

const dropdownMenu = useTemplateRef<HTMLDivElement>('dropdownMenu');
const dropdownItems = ref<DropdownItem[]>([]);
const input = useTemplateRef('searchInput');
const inputFocused = ref<boolean>(false);
const searchTerm = ref<string>('');

const hasResults = computed((): boolean => {
  return dropdownItems.value.length > 0;
});

const debouncedSearch = debounce(async () => {
  props.searchFunction(searchTerm.value).then((results: DropdownItem[]) => {
    dropdownItems.value = [ ...results ];
  });
}, 400);

const select = (item:DropdownItem): void => {
  emit('select', item);
  emit('select:value', item.value);
  setInputFocused(false);
  searchTerm.value = item.text;
};

const setInputFocused = (state:boolean=false): void => {
  inputFocused.value = state;
  if (state) setDropdownPosition();
}

const setDropdownPosition = (): void => {
  const dropdownMenuEl: HTMLDivElement = dropdownMenu.value as HTMLDivElement;

  if (!input.value) return;

  const inputEl: HTMLDivElement = input.value.$el;
  const inputElPos: DOMRect = inputEl.getBoundingClientRect();

  dropdownMenuEl.style.top = `${inputElPos.bottom}px`;
  dropdownMenuEl.style.left = `${inputElPos.left}px`;
  dropdownMenuEl.style.width = `${inputElPos.width}px`;
}

const reset = (): void => {
  searchTerm.value = '';
};

watch(searchTerm, debouncedSearch);

defineExpose({
  reset,
});
</script>

<template>
  <bc-input
      ref="searchInput"
      @blur="setInputFocused(false)"
      @focus="setInputFocused(true)"
      :placeholder="placeholder"
      v-model="searchTerm"
      :label="props.label"
  />
  <div
      ref="dropdownMenu"
      class="dropdown-menu absolute bg-sky-100 text-neutral-800 shadow-xl px-2"
      v-show="inputFocused"
  >
    <div class="menu-item flex items-center py-2 font-medium" v-if="!hasResults">
      {{ noDataMessage }}
    </div>
    <div
        class="menu-item flex items-center border-y border-b-slate-600 py-2 hover:bg-orange-100 cursor-pointer"
        v-for="item in dropdownItems"
        :key="item.value"
        @mousedown="select(item)"
    >
      <img v-if="!!item.image" :src="item.image" class="w-8 h-8 rounded-full mr-2" />
      <div class="font-medium">{{ item.text }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>