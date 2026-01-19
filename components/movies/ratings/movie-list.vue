<script setup lang="ts">
import { DStoreError } from '~/constants';
import type { MovieRating, TMDBDetailsResult } from '~/types';
import { format } from '@formkit/tempo';
import BcInput from "~/components/bc-design-system/bc-input.vue";
import BcModal from "~/components/bc-design-system/bc-modal.vue";
import BcStat from "~/components/bc-design-system/bc-stat.vue";
import MovieInfo from '~/components/movies/movie-info.vue';
import { useTMDBStore } from '~/store/tmdb';
import { useMovieStore } from '~/store/movies';

const { ratings } = defineProps({
  ratings: {
    type: Array as PropType<MovieRating[]>,
    default: [],
  },
});

const $movies = useMovieStore();
const $tmdb = useTMDBStore();

const showInfoModal = ref<boolean>(false);
const selectedRating = ref<MovieRating>();
const selectedRatingDetails = ref<TMDBDetailsResult>();

const search = computed((): string => $movies.filters?.title || '');

const hasData = computed((): boolean => {
  return ratings?.length > 0;
});

const infoHeader = computed((): string => {
  if (!selectedRating.value) return 'No Data';

  return `${selectedRating.value.title} (${selectedRating.value.e}e/${selectedRating.value.s}s)`;
});

const loadMovieDetails = (tmdbId: number) => {
  $tmdb.getMovieDetails(tmdbId)
    .then((dtls: TMDBDetailsResult) => {
      selectedRatingDetails.value = dtls;
    })
    .catch((err: DStoreError) => {
      if (err === DStoreError.RETRY) {
        setTimeout(() => loadMovieDetails(tmdbId), 100);
      }
    });
};

const setTitleFilter = (searchTerm: string) => {
  $movies.filters.title = searchTerm;
};

const openInfoModal = (rating: MovieRating) => {
  selectedRating.value = rating;
  showInfoModal.value = true;

  loadMovieDetails(selectedRating.value.tmdbId);
};

const closeInfoModal = (): void => {
  showInfoModal.value = false;
  selectedRating.value = undefined;
};
</script>

<template>
  <div class="w-full h-12">
    <bc-input
      class="mt-4 mb-0 h-full rounded-t-lg rounded-b-none"
      :debounce="400"
      placeholder="Search Ratings..."
      :modelValue="search"
      @update:modelValue="setTitleFilter"
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
      <MovieInfo v-if="selectedRating" :tmdbId="selectedRating.tmdbId || -1" />
    </template>
  </bc-modal>
</template>

<style scoped>

</style>