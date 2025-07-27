<script setup lang="ts">
import type { MovieRating } from '~/types';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '~/store/movies';

const { ratings } = storeToRefs(useMovieStore());
const CUTOFF: number = 9;

const hallOfFame = computed((): MovieRating[] => {
  return ratings.value
    .filter((mr: MovieRating) => mr.avg && mr.avg >= CUTOFF)
    .sort((a, b) => {
      if (!a.avg || !b.avg) return 0;

      if (a.avg === b.avg) {
        return a.title < b.title ? -1 : 1;
      }

      return b.avg - a.avg;
    });
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between font-semibold text-lg">
      <div class="capitalize">Hall of Fame</div>
      <div>Avg</div>
    </div>
    <div v-for="mv in hallOfFame" :key="mv.id" class="flex justify-between">
      <div>{{ mv.title }}</div>
      <div>{{ mv.avg }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>