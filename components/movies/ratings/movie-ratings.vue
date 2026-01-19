<script setup lang="ts">
import BcLoader from '~/components/bc-design-system/bc-loader.vue';
import MovieList from '~/components/movies/ratings/movie-list.vue';
import MovieChart from '~/components/movies/ratings/movie-chart.vue';
import MovieFilters from '~/components/movies/ratings/movie-filters.vue';
import { useMovieStore } from '~/store/movies';

const $movies = useMovieStore();

const hasData = computed((): boolean => {
  return $movies.ratings.length > 0;
});

const getMovieData = () => {
  $movies.getMovieRatings({})
};

onMounted(getMovieData);
</script>

<template>
  <div v-if="$movies.loading" class="w-full mt-4 flex justify-center">
    <bc-loader />
  </div>

  <div v-else-if="hasData">
    <movie-filters />

    <div class="grid grid-cols-1 lg:grid-cols-3">
      <div class="xl:max-h-[90vh] lg:col-span-2">
        <movie-chart :ratings="$movies.filteredMovieRatings" />
      </div>
      <div class="lg:h-[90vh] overflow-y-auto">
        <movie-list :ratings="$movies.filteredMovieRatings" />
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>