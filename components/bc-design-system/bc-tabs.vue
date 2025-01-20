<script setup lang="ts">
import type { Tab, TabList, TabListConfig } from "~/types";

const $emit = defineEmits([ 'select' ]);
const { tabs } = defineProps({
  tabs: Object as PropType<TabList>
});

const tabConfig = computed((): TabListConfig => {
  const propConfig: TabListConfig = tabs?.config || {};
  const defaultConfig: TabListConfig = {
    bgColor: 'bg-slate-700',
    borderColor: 'border-slate-500',
    tabBgColor: 'bg-slate-500',
    tabBorderColor: 'border-slate-500',
    activeTabBgColor: 'bg-slate-400',
    activeTabBorderColor: 'border-slate-500',
  };

  return { ...defaultConfig, ...propConfig };
});

const tabList = computed((): Tab[] => {
  return tabs?.tabs || [];
});

const containerClass = computed((): string => {
  return `${tabConfig.value.bgColor} ${tabConfig.value.borderColor}`;
});

const tabClass = (tab:Tab): string => {
  const bgColor = tab.active ? tabConfig.value.activeTabBgColor : tabConfig.value.tabBgColor;
  const borderColor = tab.active
      ? tabConfig.value.activeTabBorderColor
      : tabConfig.value.tabBorderColor;

  return `${bgColor} ${borderColor}`;
};
</script>

<template>
  <div class="w-full flex border-b rounded-t overflow-hidden" :class="containerClass">
    <div
        v-for="tab in tabList"
        :key="tab.name"
        class="py-2 px-4 border-r cursor-pointer"
        :class="tabClass(tab)"
        @click="$emit('select', tab)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<style scoped>

</style>