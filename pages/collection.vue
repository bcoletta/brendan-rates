<script setup lang="ts">
import discs from "../assets/data/discs.json";
let movies = [], tv = [];
discs.forEach(d => {
  d.location?.startsWith('t') ? tv.push(d) : movies.push(d);
});
</script>

<template>
  <div class="grid grid-cols-8 gap-4">
    <div
        v-for="disc in movies"
        :key="disc.name"
        class="w-full border border-white relative"
    >
      <!-- TODO: Get actual image for each tmdb id -->
      <img src="https://www.themoviedb.org/t/p/original/3uqXGOH4BQ2CLJWkDJZ0PzbUzOn.jpg">
      <div class="absolute top-0 w-full px-2 flex justify-end">
        {{disc.location}}
      </div>
      <div class="absolute bottom-0 w-full px-2 flex justify-between">
        {{disc.name}}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>