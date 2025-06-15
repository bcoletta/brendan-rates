<script setup lang="ts">
import type { MovieRating } from '~/types';
import BcInput from "~/components/bc-design-system/bc-input.vue";
import BcModal from "~/components/bc-design-system/bc-modal.vue";
import BcStat from "~/components/bc-design-system/bc-stat.vue";
import MovieInfo from '~/components/movies/movie-info.vue';

const $emit = defineEmits([ 'search' ]);
const { ratings } = defineProps({
  ratings: {
    type: Array as PropType<MovieRating[]>,
    default: [],
  },
});

const search = ref<string>('');
const showInfoModal = ref<boolean>(false);
const selectedRating = ref<MovieRating>();

const hasData = computed((): boolean => {
  return ratings?.length > 0;
});

const infoHeader = computed((): string => {
  return selectedRating.value?.title || 'No Data';
});

const openInfoModal = (rating: MovieRating) => {
  selectedRating.value = rating;
  showInfoModal.value = true;
};

const closeInfoModal = (): void => {
  showInfoModal.value = false;
};
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
      @click="openInfoModal(rating)"
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

  <bc-modal :open="showInfoModal" @close="closeInfoModal" :hasFooter="false">
    <template v-slot:header>
      {{ infoHeader }}
    </template>
    <template v-slot:body>
      <MovieInfo :tmdbId="selectedRating && selectedRating.tmdbId || -1" />
    </template>
  </bc-modal>
</template>

<style scoped>

</style>