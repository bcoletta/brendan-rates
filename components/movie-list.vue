<script setup lang="ts">
import type { MovieRating } from '~/types';
import BcInput from "~/components/bc-design-system/bc-input.vue";

const $emit = defineEmits([ 'search' ]);
const { ratings } = defineProps({
  ratings: Array as PropType<MovieRating[]>,
});

const search = ref<string>('');
</script>

<template>
  <div class="w-full h-12">
    <bc-input
      class="mt-4 mb-0 h-full rounded-t-lg rounded-b-none"
      :debounce="400"
      placeholder="Search Ratings..."
      :value="search.value"
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
      <div class="border rounded flex justify-center items-center relative">
        <span class="text-lg font-semibold">{{ rating.e }}</span>
        <!-- TODO - Responsiveness -->
        <div class="absolute -bottom-[.4rem] text-xs px-1 bg-slate-800">Entertainment</div>
      </div>
      <div class="border rounded flex justify-center items-center relative">
        <span class="text-lg font-semibold">{{ rating.s }}</span>
        <div class="absolute -bottom-[.4rem] text-xs px-1 bg-slate-800">Story</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>