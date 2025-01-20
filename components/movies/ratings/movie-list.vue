<script setup lang="ts">
import type { MovieRating } from '~/types';
import BcInput from "~/components/bc-design-system/bc-input.vue";
import BcStat from "~/components/bc-design-system/bc-stat.vue";

const $emit = defineEmits([ 'search' ]);
const { ratings } = defineProps({
  ratings: {
    type: Array as PropType<MovieRating[]>,
    default: [],
  },
});

const search = ref<string>('');

const hasData = computed((): boolean => {
  return ratings?.length > 0;
});
</script>

<template>
  <div class="w-full h-12">
    <bc-input
      class="mt-4 mb-0 h-full rounded-t-lg rounded-b-none"
      :debounce="400"
      placeholder="Search Ratings..."
      :value="search"
      @update:modelValue="$emit('search', $event)"
    />
  </div>

  <div
      v-for="rating in ratings"
      :key="rating.id"
      class="grid grid-cols-3 border-b p-2 bg-slate-800 text-gray-300"
  >
    <div class="col-span-2">
      <div class="font-semibold text-lg" :title="rating.title">{{ rating.title }}</div>
      <div class="text-sm">{{ rating.date }}</div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <bc-stat
        label="E"
        label-bg-color="bg-slate-800"
        title="Entertainment"
        :value="rating.e"
      />
      <bc-stat
        label="S"
        label-bg-color="bg-slate-800"
        title="Story"
        :value="rating.s"
      />
    </div>
  </div>

  <div v-if="!hasData" class="border-b p-2 bg-slate-800 text-gray-300">
    No results found.
  </div>
</template>

<style scoped>

</style>