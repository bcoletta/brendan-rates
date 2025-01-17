<script setup lang="ts">
import MovieChart from '~/components/movie-chart.vue';
import MovieList from "~/components/movie-list.vue";
import { useMovieStore } from '~/store/movies';
import type { MovieRating } from '~/types/types';

const $movies = useMovieStore();

const movieRatings = ref<MovieRating[]>([]);
const sort = 'date';

const hasData = computed<boolean>(() => {
  return movieRatings.value.length > 0;
})

const getMovieData = (filter:string='') => {
  $movies.getMovieRatings({ filter, sort })
    .then((res: MovieRating[]) => movieRatings.value = res);
};

const filter = (searchTerm:string) => {
  getMovieData(searchTerm);
}

onMounted(getMovieData);
</script>

<template>
  <!-- TODO - Masthead -->
  <!-- TODO - Tabs -->
  <div v-if="hasData" class="w-fit container mx-auto grid grid-cols-1 lg:grid-cols-3">
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