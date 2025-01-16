<script setup lang="ts">
import { getMovies } from "~/services/movies";
import type { MovieRating } from "~/types";

const movieRatings = ref<MovieRating[]>([]);

const getMovieData = () => {
  getMovies().then((ratings: MovieRating[]) => {
    movieRatings.value = [ ...ratings ]
        .sort((a,b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
  })
};

onMounted(getMovieData);
</script>

<template>
  <div v-for="rating in movieRatings" :key="rating.id">
    {{rating.date}}: {{ rating.title }} - {{ rating.e }}e/{{ rating.s }}s
  </div>
</template>

<style scoped>

</style>