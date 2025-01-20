<script setup lang="ts">
import type { MovieRating } from '~/types';
import BcInput from "~/components/bc-design-system/bc-input.vue";

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
      <div class="border rounded flex justify-center items-center relative" title="Entertainment">
        <span class="text-lg font-semibold">{{ rating.e }}</span>
        <div class="absolute -bottom-[.4rem] text-xs px-1 bg-slate-800">
          E
        </div>
      </div>
      <div class="border rounded flex justify-center items-center relative" title="Story">
        <span class="text-lg font-semibold">{{ rating.s }}</span>
        <div class="absolute -bottom-[.4rem] text-xs px-1 bg-slate-800">S</div>
      </div>
    </div>
  </div>

  <div v-if="!hasData" class="border-b p-2 bg-slate-800 text-gray-300">
    No results found.
  </div>
</template>

<style scoped>

</style>