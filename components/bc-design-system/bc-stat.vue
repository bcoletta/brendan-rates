<script setup lang="ts">
const props = defineProps({
  labelBgColor: {
    type: String,
    default: 'bg-slate-900'
  },
  label: String,
  textSize: {
    type: String,
    default: 'text-lg'
  },
  title: String,
  value: [Number,String],
});

const title = computed(():string => {
  return props.title || props.label || '';
})
</script>

<template>
  <div class="h-full w-full border rounded flex justify-center items-center relative" :title="title">
    <span class="font-semibold" :class="props.textSize">{{ props.value }}</span>
    <div
      class="
        absolute -bottom-[.4rem]
        text-xs text-center
        px-1
        w-full overflow-x-hidden whitespace-nowrap text-ellipsis
      "
    >
      <span class="px-0.5" :class="props.labelBgColor">{{ props.label }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>