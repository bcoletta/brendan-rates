<script setup lang="ts">
import BcLoader from '~/components/bc-design-system/bc-loader.vue';
import MovieList from '~/components/movie-list.vue';
import MovieChart from '~/components/movie-chart.vue';
import { useMovieStore } from '~/store/movies';
import type { MovieRating } from '~/types';

const $movies = useMovieStore();

const movieRatings = ref<MovieRating[]>([]);
const sort = ref<string>('date');

const hasData = computed((): boolean => {
  return $movies.ratings.length > 0;
});

const getMovieData = (filter:string='') => {
  $movies.getMovieRatings({ filter, sort: sort.value })
      .then((res: MovieRating[]) => movieRatings.value = res);
};

const filter = (searchTerm:string) => {
  getMovieData(searchTerm);
};


onMounted(getMovieData);
</script>

<template>
  <div v-if="$movies.loading" class="w-full mt-4 flex justify-center">
    <bc-loader />
  </div>

  <div v-else-if="hasData" class="grid grid-cols-1 lg:grid-cols-3">
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