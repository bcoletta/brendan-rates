<script setup lang="ts">
import BcLoader from "~/components/bc-design-system/bc-loader.vue";
import MovieChart from '~/components/movie-chart.vue';
import MovieList from "~/components/movie-list.vue";
import { useMovieStore } from '~/store/movies';
import type { MovieRating } from '~/types';

const $movies = useMovieStore();

const movieRatings = ref<MovieRating[]>([]);
const sort = 'date';

const hasData = computed<boolean>(() => {
  return movieRatings.value.length > 0;
});

const getMovieData = (filter:string='') => {
  $movies.getMovieRatings({ filter, sort })
    .then((res: MovieRating[]) => {
      return movieRatings.value = res
    });
};

const filter = (searchTerm:string) => {
  getMovieData(searchTerm);
}

onMounted(() => {
  getMovieData();
});
</script>

<template>
  <!-- TODO - Masthead -->
  <!-- TODO - Tabs -->
  <div v-if="$movies.loading" class="w-full mt-4 flex justify-center">
    <bc-loader />
  </div>
  <div v-else-if="hasData" class="w-fit container mx-auto grid grid-cols-1 lg:grid-cols-3">
    <div class="xl:max-h-[90vh] lg:col-span-2">
      <movie-chart :ratings="movieRatings" />
    </div>
    <div class="lg:h-[90vh] overflow-y-auto">
      <movie-list :ratings="movieRatings" @search="filter" />
    </div>
  </div>
</template>

<style scoped>

</style>